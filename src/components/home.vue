<template>
    <div class="home">
        <v-carousel></v-carousel>
        <div class="homeTitle"><p>今日推荐</p></div>
        <ul>
            <li v-for="(val,index) in arr">
                <a href="javascript:;" @click="sendMusic(val)">
                    <img :src="val.img" :alt="val.name">
                    <p class="songName">{{val.name}}</p>
                    <p class="singer">{{val.singer}}</p>
                </a>
            </li>
        </ul>
        <router-link to="/raking" tag="a" class="goToSeniority" >底下没有啦，快去排行榜看看吧</router-link>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'//使用状态管理里的mapActions来传递方法
    import Carousel from './carousel.vue'
    export default{
        data(){
            return{
                arr:[],//存放推荐列表
            }
        },
        methods: {
            getList () {
                let id = [5, 6];
                this.arr = [];
                let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + id[0] + "&_=1492910996732";
                let url2 = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + id[1] + "&_=1492910996732";
                this.$http.jsonp(url, {
                    jsonp: 'jsonpCallback'
                }).then(res => {
                    let val = res.body.songlist
                    for (let i = 0; i < 5; i++) {
                        this.arr.push({
                            name:val[i].data.songname,
                            img:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+val[i].data.albummid+".jpg?max_age=2592000",
                            songid:val[i].data.songid,
                            songmid: val[i].data.songmid,
                            singer:val[i].data.singer[0].name
                        })
                    }
                    this.$http.jsonp(url2, {
                        jsonp: 'jsonpCallback'
                    }).then(res => {
                        val = res.body.songlist
                        for (let i = 0; i < 5; i++) {
                            this.arr.push({
                                name:val[i].data.songname,
                                img:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+val[i].data.albummid+".jpg?max_age=2592000",
                                songid:val[i].data.songid,                                songmid: val[i].data.songmid,
                                singer:val[i].data.singer[0].name
                            })
                        }
                    })
                })
            },
            ...mapActions(['sendMusic']),//传递当前点击音乐
        },
        mounted(){
            if (sessionStorage.getItem('isLogin')) {
                this.$store.dispatch('changeLikeSongs')
            }
            this.getList()
            // this.$http.get("/src/json/recommend.json").then(res => {//请求推荐列表数据
            //     this.arr=res.body.data;
            // },error =>{
            //     console.log(error);
            // });
        },
        components:{
            'v-carousel':Carousel
        }
    }

</script>
<style>
    .home{
        height: 88%;
        padding-bottom: 20%;
        overflow: auto;
    }
    .homeTitle{
        display: flex;
        margin: 8px 0;
        justify-content: space-between;
    }
    .homeTitle p{
        padding:0 10px;
        height:4vh;
        line-height: 4vh;
        background:#956;
        font-size: 1.2rem;
        color: #fff;
        border-radius: 0 2vh 2vh 0;
    }
    .homeTitle a{
        display: block;
        padding:0 10px;
        margin-right: 20px;
        height:4vh;
        line-height: 4vh;
        font-size: 1rem;
        color: #4c221b;
        background: #edd1d8;
        border-radius: 2vh;
    }
    .home ul{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .home ul li{
        margin-bottom: 10px;
    }
    p.songName{
        color: #333;
        font-size: 1.2rem;
        margin: 5px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
    }
    .singer{
        color: #666;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
    }
    .goToSeniority{
        margin-top: 10px;
        display: block;
        text-align: center;
        color: #999;
    }
</style>