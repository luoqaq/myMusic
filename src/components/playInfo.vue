<template>
    <div class="playInfo">
        <v-musiclist></v-musiclist>
        <div class="playInfoTitle">
            <button @click="hidPlayInfo" class="iconfont icon-back"></button>
            <p>{{this.nowSong.name}} - {{this.nowSong.singer}}</p>
        </div>
        <div class="lycBox">
            <transition>
                <ul class="lyc" :style='{top:lyricPlace}'>
                     <li v-for="(val,index) in lyric"
                         :class="{nowLyc:index<=parseInt(currentTime)}"
                     >
                          {{val}}
                     </li>
                 </ul>
            </transition>
        </div>
        <div class="playbackProgress">
            <span>{{currentTime | date}}  </span>
            <mu-slider
                    v-model="moveValue"
                    class="demo-slider progress"
                    @change="moveSetTime"
            />
            <span>{{duration | date}}</span>
        </div>
        <div class="playBtnBox">
            <button @click="like" v-if="!isLike" class="iconfont icon-heart-empty"></button>
            <button @click="like" v-else class="iconfont icon-heart-full like"></button>
            <button @click="prevMusic" class="iconfont icon-prev"></button>
            <button @click="play" :class="playBtnClass+' playbtn'"></button>
            <button @click="nextMusic" class="iconfont icon-next"></button>
            <button class="iconfont icon-menu-music" @click.stop="openListState"></button>
        </div>
        <!-- <x-dialog></xdialog> -->
        <div class="dialog" v-if="dialogShow">
            <div class="dialogContent">
                <p class="dialogTitle">您还没有登录</p>
                <p class="dialogCancel" @click="dialogShow=false">取消</p>
                <p class="dialogOk" @click="toLogin">去登录</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Base64 from '../assets/js/base64';
    import parseLyric from '../assets/js/lyc';
    import {mapActions,mapGetters} from 'vuex';
    import MusicList from './musicList.vue'
    import jquery from 'jquery';
    // import xDialog from '../../node_modules/vux/src/components/x-dialog'

    Vue.filter('date',function(input){
        let time = new Date();
        time.setTime(input*1000);
        let seconds = time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds();
        return time.getMinutes()+'.'+seconds;
    });
    export default{
        data(){
            return{
                lyric:'',
                lyricPlace:35+"vh",
                time:0,
                moveValue:0,
                isLike: false,
                dialogShow: false
            }
        },
        mounted(){
            this.getLyc();
            if (this.$store.state.isLogin) {
                this.$store.dispatch('changeLikeSongs')
                this.isLikeM()
            }
            let _this =this;
            document.onclick=function () {
                _this.closeListState()
            };
            setTimeout(function () {
                let nowLyc= document.getElementsByClassName('nowLyc');
                let scrH =0;
                for (let i=0;i<nowLyc.length;i++){
                    scrH+=nowLyc[i].offsetHeight;
                }
                jquery('.lycBox').scrollTop(scrH);
            },100);
        },
        methods:{
            moveSetTime(){
                console.log('moveSetTime')
                if (this.duration>0){
                    setTimeout( () =>{
                        this.setCurrentTime(this.moveValue*this.duration/100);
                    },0);
                    let scroll = setTimeout(()=>{
                        clearTimeout(scroll);
                        let nowLyc= document.getElementsByClassName('nowLyc');
                        let scrH =0;
                        for (let i=0;i<nowLyc.length;i++){
                            scrH+=nowLyc[i].offsetHeight;
                        }
                        jquery('.lycBox').scrollTop(scrH);
                    },10)
                }
            },
            getLyc(){
                if(this.nowSong.songid !== -1){
                    this.$http.jsonp("https://api.darlin.me/music/lyric/"+this.nowSong.songid+"/?").then(res =>{
                        let base = new Base64();
                        let result2 = base.decode(res.body.lyric);
                        this.lyric=parseLyric(result2)
                    })
                }
            },
            like () {
                if (this.$store.state.isLogin) {
                    if (this.nowSong.songid !== -1) {
                        this.isLike = !this.isLike
                        var flag = 1 //传到后台，判断是添加喜欢还是删除喜欢
                        if (!this.isLike) {
                            flag = 0
                        }
                        var params = `?tel=${this.$store.state.user.tel}&song_id=${this.nowSong.songid}&flag=${flag}`
                        this.$http.get(this.$store.state.baseUrl + '/like' + params).then(res => {
                            if (res.body.code === 2) {
                                var data = {
                                    name: this.nowSong.name,
                                    img: this.nowSong.img,
                                    singer: this.nowSong.singer,
                                    songid: this.nowSong.songid,
                                    songmid: this.nowSong.songmid
                                }
                                this.$http.post(this.$store.state.baseUrl + '/addSong', data).then(res => {
                                    if (res.body.code === 0) {
                                        console.log('歌曲添加成功')
                                    } else {
                                        console.log('歌曲添加失败')
                                    }
                                })
                                this.$store.dispatch('changeLikeSongs')
                            }
                        })
                    }
                } else {
                    this.dialogShow = true
                }
            },
            toLogin () {
                this.dialogShow = false
                this.$router.push('/login')
            },
            isLikeM () {
                console.log(this.$store.state.likeSongs)
                let _this = this
                this.$store.state.likeSongs.forEach(function(v,i){
                    if (v == _this.nowSong.songid.toString()) {
                        _this.isLike = true
                        return
                    }
                })
            },
            ...mapActions([
                'hidPlayInfo',
                'openListState',
                'closeListState',
                'play','nextMusic',
                'prevMusic',
                'setCurrentTime',
                'movePlay'
            ])
        },
        computed:{
            ...mapGetters(['nowSong','currentTime','playBtnClass','duration'])
        },
        components:{
            'v-musiclist':MusicList
        },
        watch:{
            nowSong(){
                this.getLyc();
                jquery('.lycBox').scrollTop(0)
            },
            currentTime(){
                this.time=parseInt(this.currentTime)
            },
            time(){
                if (this.lyric[this.time]){
                    let nowLyc= document.getElementsByClassName('nowLyc');
                    let scrH =0;
                    for (let i=0;i<nowLyc.length;i++){
                        scrH+=nowLyc[i].offsetHeight;
                    }
                    jquery('.lycBox').animate({scrollTop:scrH});
                }
                this.moveValue=(this.currentTime/this.duration).toFixed(4)*100
            }
        }
    }
</script>
<style scoped>
    .playInfo{
        position: absolute;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        height:100vh;
        width:100%;
        max-width: 633px;
       /* background:url('../assets/img/background.jpg') no-repeat fixed center;*/;
        margin: 0 auto;
        z-index: 3;
    }
    .playInfo:before{
        content: '';
        position: absolute;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        z-index: -5;
        background: rgba(211, 233, 244, .7);
        /*background: rgba(244, 233, 211, .7);*/
    }
    .playInfo:after{
        content: '';
        position: absolute;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        z-index: -10;
        background:url('../assets/img/background.jpg') no-repeat fixed center;
        background-size: 100% 100%;
    }
    .playInfoTitle{
        height:6vh;
        display: flex;
    }
    .playInfoTitle p{
        padding-right: 10%;
        line-height: 6vh;
        font-size: 1.4rem;
        color: #555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .playInfoTitle button{
        margin-right: 1rem;
        margin-left: .5rem;
        font-size: 2rem;
        color: #333;
    }
    .lycBox{
        height:70vh;
        overflow: auto;
    }
    .lyc{
        position: relative;
        transition: .2s all;
    }
    .lyc .nowLyc{
        color: #f44336;
    }
    .lyc li{
        min-height: 5vh;
        line-height: 5vh;
        text-align: center;
        font-size: 1.2rem;
    }
    .playbackProgress{
        margin-top: 4vh;
        height: 6vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .progress{
        width:70%;
        background: #fff;
        height:.5vh;
        margin: 0 1rem;
        position: relative;
        color: #f44336;
    }
    .progress p{
        position: absolute;
        background: #f44336;
        height:.5vh;
    }
    .progress button{
        width:2vh;
        height:2vh;
        border-radius: 1vh;
        background: #f44336;
        position: absolute;
        top:-.8vh;
    }
    .playBtnBox{
        height:12vh;
        display: flex;
        justify-content: space-around;
    }
    .playBtnBox button{
        font-size: 2.5rem;
        flex: 1;
    }
    .playBtnBox .songList{
        flex: 0;
        font-size: 2rem;
    }
    .playbtn:before{
        font-size: 45px;
    }
</style>