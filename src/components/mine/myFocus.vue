<template>
	<div class="myFocus fullScreen">
        <p @click="back" class="back"><b class="iconfont icon-back"></b>返回</p>
        <h1>我的关注</h1>
        <a class="toRecommend" @click="toRecommend" v-if="noFocus">还未关注任何人，赶紧去找志趣相投的人吧！</a>
		<ul class="focusList">
            <li v-for="item in focus_Users">
                <p>用户名：{{item.focus_user}}</p>
                <a href="#" @click="toFocusUserSongs(item.focus_user)">他的收藏</a>
                <a href="#" v-if="isFocus" @click="focus(item.focus_user,0)" class="hasFocus">取消关注</a>
                <a href="#" v-else @click="focus(item.focus_user,1)">关注</a>
            </li>
        </ul>
	</div>
</template>
<script>
    export default {
    	name: 'mine',
    	data () {
    		return {
                focus_Users: [],
                noFocus: true,
                isFocus: true
    		}
    	},
    	methods: {
            back () {
                this.$router.push('/mine')
            },
            getFocus () {
                this.$http.get(this.$store.state.baseUrl+'/getFocus?tel=' + this.$store.state.user.tel).then(function(res){
                    if (res.body.data) {
                        this.focus_Users = res.body.data
                        if (this.focus_Users.length > 0) {
                            this.noFocus = false
                        }
                    }
                })
            },
            toRecommend () {
                this.$router.push('/mine/recommend')
            },
            focus (focus_user,flag) {
                this.isFocus = !this.isFocus
                let params = `tel=${this.$store.state.user.tel}&focus_user=${focus_user}&flag=${flag}`
                this.$http.get(this.$store.state.baseUrl+'/focus?' + params).then(function(res){
                    console.log(res)
                })
            },
            toFocusUserSongs (focus_user) {
                this.$router.push({path:'/focusUserSongs', query:{focus_user: focus_user}})
            }
    	},
    	mounted () {
            this.getFocus()
    	}
    } 
</script>
<style>
    .myFocus {
        padding: 8px;
    }
    .toRecommend{
        font-size: 1.3rem;
    }
    .focusList>li{
        padding: 10px;
        border: 1px solid #aaa;
        border-radius: 8px;
        overflow: hidden;
    }
    .focusList>li p{
        font-size: 1.4rem;
        margin-bottom: 10px; 
    }
    .focusList>li a{
        float: right;
        margin-right: 15px;
    }
</style>