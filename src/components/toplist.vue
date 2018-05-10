<template>
    <div class="topListBox"
         :style="backgroundUrl"
    >
        <div  class="goToRaking">
            <p></p>
                <a href="javascript:;"
                   @click="$router.go(-1)"
                >
                    <b class="iconfont icon-back"></b>
                    <span>返回排行榜</span>
                </a>
        </div>
        <div class="topList">
            <div  class="topListTitle">
                <h1>
                    {{topList.title}}
                </h1>
            </div>
            <ul class="topListC">
                <li class="topListInfo"
                    v-for="(val,index) in topList.list"
                    :key="index"
                    @click="$store.dispatch('sendMusic',val)"
                >
                    <h1>
                        {{index+1}}
                    </h1>
                    <P>
                        <b>
                            {{val.name}}
                        </b>
                        <span>
                            {{val.singer}}
                        </span>
                    </P>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                topList:{color:'',img:'',list:[]},
                infoColor:false
            }
        },
        mounted(){
            let id = this.$route.params.topid;
            let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + id + "&_=1492910996732";
            this.$http.jsonp(url, {
                jsonp: 'jsonpCallback'
            }).then(res => {
                if(res.body.color>10000000){
                    this.infoColor=true
                }else if (res.body.color<100){
                    this.infoColor=true
                }else {
                    this.infoColor=false;
                }
                this.topList.title=res.body.topinfo.ListName;
                this.topList.color='#'+res.body.color.toString(16);
                if (this.topList.color.length<7){
                    for(let i =this.topList.color.length;i<7;i++ ){
                        this.topList.color+="9"
                    }
                }
                this.topList.img=res.body.topinfo.pic_album;
                res.body.songlist.forEach(val => {
                    this.topList.list.push({
                        name:val.data.songname,
                        img:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+val.data.albummid+".jpg?max_age=2592000",
                        songid:val.data.songid,
                        songmid: val.data.songmid,
                        singer:val.data.singer[0].name})
                });
            })
        },
        computed:{
            backgroundUrl(){
                return  "background-image:url("+this.topList.img+") ;"
            }
        }
    }
</script>
<style>
    .goToRaking{
        position: fixed;
        top:0;
        left: 0;
        z-index: 2;
        width: 100%;
        height:6vh;
        line-height: 6vh;
        padding-left: 1rem;
        font-size: 1.4rem;
    }
    .goToRaking p{
        position: absolute;
        top:0;
        left: 0;
        width:100%;
        height:100%;
        background: rgba(255, 255, 255, .5);
        z-index: 0;
    }
    .goToRaking a{
        position: relative;
        color: #333;
        z-index: 1;
    }
    .topListBox{
        height: 90%;
        overflow: auto;
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
    }
    .topListTitle{
        height:8vh;
        background: rgba(255, 255, 255, .5);
    }
    .topListTitle h1{
        line-height: 8vh;
        padding-left: 6%;
        font-size: 1.8rem;
    }
    .topList{
        padding-top: 46vh;
    }
    .topListC{
        background-color: #fff;
    }
    .topListInfo{
        display: flex;
        margin: 0;
        align-content: center;
        padding: 5px;
    }
    .topListInfo h1{
        height:8vh;
        line-height: 8vh;
        padding: 0;
        margin: 0;
        font-size: 1.6rem;
        width:14%;
        color: #333;
        text-align: center;
    }
    .topListInfo p{
        flex: 1;
        height:8vh;
        width:66%;
    }
    .topListInfo p b,.topListInfo p span{
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width:70%;
    }
    .topListInfo p span{
        height:3vh;
        line-height: 3vh;
        color: #aaa;
        font-size: 1.2rem;
    }
    .topListInfo p b{
        height:4vh;
        line-height: 4vh;
        font-weight: normal;
        font-size: 1.4rem;
        color: #333;
    }
</style>