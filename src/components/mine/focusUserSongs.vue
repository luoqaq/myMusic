<template>
	<div class="myLike fullScreen">
        <p @click="back" class="back"><b class="iconfont icon-back"></b>返回</p>
        <h1>{{focus_user}}的收藏</h1>
		<ul>
            <li class="song" v-for="song in songList" @click="$store.dispatch('sendMusic',song)">
                <img :src="song.img">
                <p>
                    <span class="song_name">{{song.name}}</span>
                    <span class="singer">{{song.singer}}</span>
                </p>
            </li>
        </ul>
	</div>
</template>
<script>
    export default {
    	name: 'mine',
    	data () {
    		return {
                focus_user: '111',
    			LoveMusic: 20,
    			focusPeople: 3,
    			lastPlay: 100,
                songList: []
    		}
    	},
    	methods: {
            back () {
                this.$router.push('/mine')
            }
    	},
    	mounted () {
            this.focus_user = this.$route.query && this.$route.query.focus_user
            this.$http.get(this.$store.state.baseUrl+'/songs?tel=' + this.$store.state.user.tel).then(function(res){
                if (res.body.code === 0) {
                    var list = res.body.data
                    this.songList = []
                    let _this = this
                    list.forEach(function(v,i){
                        _this.songList.push({
                            songid: v.song_id,
                            songmid: v.song_mid,
                            name: v.song_name,
                            img: v.song_img,
                            singer: v.singer
                        })
                    })
                }
            })
    	}
    } 
</script>
<style>
    .song{
        display: flex;
        padding: 5px;
    }
    .song img{
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        border-radius: 20%;
    }
    .song>p>span{
        display: inline-block;
        margin-left: 10px;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .song .song_name{
        font-size: 1.3rem;
    }
    .song .singer{
        font-size: 1.0rem;
        color: #888;
    }
</style>