<template>
	<div class="lastPlay fullScreen">
        <p @click="back" class="back"><b class="iconfont icon-back"></b>返回</p>
        <div class="recommend">
            <div class="box">
                <h2>共同的歌手--<span>{{singer}}</span></h2>
                <div class="user">
                    <p>推荐用户：<span>{{user_tel_singer}}</span></p>
                    <p>此用户共收藏{{singer}}的歌曲： <span>{{singerCount}}</span> 首</p>
                    <div v-if="showBtnSinger">
                        <a href="#" @click="toFocusUserSongs(0)">他的收藏</a>
                        <a href="#" v-if="!isFocusSinger" @click="focusSinger(1)">关注</a>
                        <a href="#" v-else @click="focusSinger(0)" class="hasFocus">已关注</a>
                    </div>
                </div>
            </div>
            <div class="box">
                <h2>共同的音乐</h2>
                <div class="user">
                    <p>推荐用户：<span>{{user_tel_music}}</span></p>
                    <p>此用户与你收藏的相同歌曲最多： <span>{{similarCount}}</span> 首</p>
                    <div v-if="showBtnMusic">
                        <a href="#" @click="toFocusUserSongs(1)">他的收藏</a>
                        <a href="#" v-if="!isFocusMusic" @click="focusMusic(1)">关注</a>
                        <a href="#" v-else @click="focusMusic(0)" class="hasFocus">已关注</a>
                    </div>
                </div>
            </div>
            <!-- <div class="box">
                <h2>共同的歌手--<span>{{singer}}</span></h2>
                <div class="user">
                    <p>推荐用户：<span>{{user_tel}}</span></p>
                    <p>此用户共收藏{{singer}}的歌曲： <span>{{singerCount}}</span> 首</p>
                    <a href="#">查看</a>
                    <a href="#" v-if="!isFocus" @click="focus(1)">关注</a>
                    <a href="#" v-else @click="focus(0)" class="hasFocus">已关注</a>
                </div>
            </div>  -->
        </div>
	</div>
</template>
<script>
    export default {
    	name: 'mine',
    	data () {
    		return {
    			singer: '',
                singerCount: 0,
                user_tel_singer: '',
                user_tel_music: '',
                similarCount: 0,
                isFocusSinger: false,
                isFocusMusic: false,
                showBtnSinger: false,
                showBtnMusic: false
    		}
    	},
    	methods: {
            back () {
                this.$router.push('/mine')
            },
            focusSinger (index) {
                this.isFocusSinger = !this.isFocusSinger
                let flag = 1
                if (index === 0) {
                    flag = 0
                }
                let params = `tel=${this.$store.state.user.tel}&focus_user=${this.user_tel_singer}&flag=${flag}`
                this.$http.get(this.$store.state.baseUrl+'/focus?' + params).then(function(res){
                    console.log(res)
                })
            },
            focusMusic (index) {
                this.isFocusMusic = !this.isFocusMusic
                let flag = 1
                if (index === 0) {
                    flag = 0
                }
                let params = `tel=${this.$store.state.user.tel}&focus_user=${this.user_tel_music}&flag=${flag}`
                this.$http.get(this.$store.state.baseUrl+'/focus?' + params).then(function(res){
                    console.log(res)
                })
            },
            getRecommend () {
                this.$http.get(this.$store.state.baseUrl+'/bySinger?tel=' + this.$store.state.user.tel).then(function(res){
                    var singer = res.body.singer
                    if (res.body.code === 0) {
                        this.singer = singer.singer
                        this.singerCount = singer.song_count
                        this.user_tel_singer = singer.user_tel
                        this.showBtnSinger = true
                    } else if (res.body.code === 1) {
                        this.singer = singer.singer
                        this.singerCount = 0
                        this.user_tel_singer = '爱好别致，无人能及'
                    } else if (res.body.code === 2) {
                        this.user_tel_singer = '收藏同一歌手的3首歌才会有哦'
                    }
                })
                this.$http.get(this.$store.state.baseUrl+'/byMusic?tel=' + this.$store.state.user.tel).then(function(res){
                    let body =res.body
                    if (body.code === 0) {
                        this.user_tel_music = body.similar
                        this.similarCount = body.similarCount
                        this.showBtnMusic = true
                    } else if (body.code === 1) {
                        this.user_tel_music = '爱好别致，无人能及'
                        this.similarCount = 0
                    } 
                })
            },
            toFocusUserSongs (index) {
                let q = {}
                if (index === 0) {
                    q = {
                        focus_user: this.user_tel_singer
                    }
                } else {
                    q = {
                        focus_user: this.user_tel_music
                    }
                }
                this.$router.push({path:'/focusUserSongs', query:q})
            }
    	},
    	mounted () {
            this.getRecommend()
    	}
    } 
</script>
<style>
    div.recommend{
        margin-top: 30px;
    }
    .box{
        padding: 8px;
        border-radius: 8px;
        border: 1px solid #aaa;
        margin-top: 20px;
    }
    .box h2 {
        text-align: center;
        font-size: 1.5rem;
        padding: 5px;
    }
    .box p {
        font-size: 1.3rem;
        margin-bottom: 5px;
    }
    .box span{
        font-weight: bold;
        color: #333;
    }
    .user{
        overflow: hidden;
    }
    .box>.user a{
        float: right;
        margin-right: 15px;
    }
    .hasFocus {
        color: #666;
    }
</style>