<template>
	<div class="mine">
        <h1 v-if="!isLogin" class="li-login" @click="login">~ 立即登录 ~</h1>
		<group label-width="4.5em" label-margin-right="2em" label-align="right">
    		<cell title="我的收藏" :value="this.$store.state.likeSongs.length" is-link @click.native="to(1)"></cell>
    		<cell title="我的关注" :value="focusPeople" is-link @click.native="to(2)"></cell>
            <cell title="志趣相投" :value="recommend" is-link @click.native="to(3)"></cell>
    		<cell title="最近播放" :value="lastPlay" is-link @click.native="to(4)"></cell>
	    </group>
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
    import group from '../../node_modules/vux/src/components/group'
    import cell from '../../node_modules/vux/src/components/cell'
    export default {
    	name: 'mine',
    	data () {
    		return {
    			focusPeople: 0,
                recommend: 2,
    			lastPlay: 100,
                dialogShow: false
    		}
    	},
    	components: {
    		group, cell
    	},
    	methods: {
            to (index) {
                if (!this.$store.state.isLogin) {
                    this.dialogShow = true
                    return
                }
                let url = '';
                switch (index){
                    case 1: url = '/mine/myLike'; break;
                    case 2: url = '/mine/myFocus'; break;
                    case 3: url = '/mine/recommend'; break;
                    case 4: url = '/mine/lastPlay'; break;
                }
                this.$router.push(url)
            },
            login () {
                this.$router.push('/login')
            },
            toLogin () {
                this.dialogShow = false
                this.$router.push('/login')
            },
            getFocus () {
                this.$http.get(this.$store.state.baseUrl+'/getFocus?tel=' + this.$store.state.user.tel).then(function(res){
                    if (res.body.data) {
                        this.focusPeople = res.body.data.length
                    }
                })
            },
    	},
        computed: {
            isLogin: function () {
                return this.$store.state.isLogin
            }
        },
        watch: {
            isLogin: function () {
                this.isLogin = this.$store.state.isLogin
                if (this.$store.getters.getUser.name !== 'empty') {
                    this.userInfo.name = this.$store.getters.getUser.name
                }
            }
        },
    	mounted () {
            if (this.$store.state.isLogin) {
                this.$store.dispatch('changeLikeSongs')
                this.getFocus()
            }
    	}
    } 
</script>
<style>
    h1.li-login{
        text-align: center;
        color: #e57373;
    }
</style>