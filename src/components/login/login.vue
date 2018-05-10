<template>
	<div class="login fullScreen2">
        <p class="center top-header">登录</p>
        <b class="close iconfont icon-close" @click="back"></b>
        <div class="section">
            <img :src="img"><br>
            <group>
                <x-input title="账号" v-model="user" is-type="china-mobile" placeholder="输入手机号" required text-align="center" id="tel"></x-input>
                <x-input title="密码" v-model="password" :type="passwordType" requird text-align="center">
                    <b v-if="!canLook" slot="right" class="iconfont icon-noLook" @click="look(true)"></b>
                    <b v-else slot="right" class="iconfont icon-canLook" @click="look(false)"></b>
                </x-input>
            </group>
            <div class="group">
                <XButton plain style="border-radius:99px; color: #ce3c39; border-color: #ce3c39" @click.native = 'login' >登录</XButton>
                <XButton plain style="border-radius:99px; color: #ce3c39; border-color: #ce3c39" @click.native="regist">手机号注册</XButton>
            </div>
        </div>
        <div class="bottom">
            <divider>其他登录方式</divider>
            <div class="logWay">
                <span><b class="iconfont icon-qq"></b><br>QQ</span>
                <span><b class="iconfont icon-weixin"></b><br>微信</span>
                <span><b class="iconfont icon-weibo"></b><br>微博</span>
            </div>
        </div>
        <Alert v-model="alertShow" :title="alertTitle" :content="alertContent" style="color: red"></Alert>
	</div>
</template>
<script>
    import group from '../../../node_modules/vux/src/components/group'
    import divider from '../../../node_modules/vux/src/components/divider'
    import XButton from '../../../node_modules/vux/src/components/x-button'
    import XInput from '../../../node_modules/vux/src/components/x-input'
    import Alert from '../../../node_modules/vux/src/components/alert'

    export default {
    	name: 'login',
        components: {
            group, XButton, XInput, divider, Alert
        },
    	data () {
    		return {
    			img: require('../../assets/img/logo-heart.png'),
                user: '',
                password: '',
                canLook : false,
                passwordType: 'password',
                lertShow: false,
                alertShow: false,
                alertTitle: '登录失败',
                alertContent: '账号或密码不正确哦'
    		}
    	},
    	methods: {
            back () {
                this.$router.push('/home')
            },
            look (b) {
                if (b) {
                    this.canLook = true;
                    this.passwordType = 'text'
                } else {
                    this.canLook = false;
                    this.passwordType = 'password'
                }
            },
            // getLikeSongs () {
            //     var params = `?tel=${this.$store.state.user.tel}`
            //     this.$http.get(this.$store.state.baseUrl + '/likeSongs' + params).then((res) => {
            //         console.log(res)
            //     })
            // },
            regist () {
                this.$router.push('/regist')
            },
            login () {
                var telStyle = window.getComputedStyle(document.getElementById('tel')).color
                if (this.user && this.password && (telStyle !== 'rgb(230, 67, 64)')) {
                    var data = {
                        tel: this.user,
                        pwd: this.password
                    }
                    this.$http.post(this.$store.state.baseUrl + '/login', data).then(function (data) {
                        if (data.body.code === 0) {
                            var user = data.body.data
                            var u = {tel: this.user, name: user.name||'empty', img: user.img||'empty'}
                            this.$store.dispatch('isLogin', true)
                            this.$store.dispatch('changeUser', u)

                            sessionStorage.setItem('isLogin', true);
                            sessionStorage.setItem('user', JSON.stringify(u))

                            this.$router.push('/home')
                        } else {
                            this.alertContent = data.body.message
                            this.alertShow = true
                        }
                    })
                } else {
                    this.alertContent = '账号或密码不正确哦'
                    this.alertShow = true
                }
            }
    	},
    	mounted () {

    	}
    } 
</script>
<style>
    .login {
        z-index: 5;
    }
    .section {
        padding: 30px 8px;
        text-align: center;
    }
    .section img {
        width: 100px;
        height: 100px;
    }
    .group {
        margin-top: 20px;
    }
    .logWay {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .logWay span {
        font-size: 14px;
        text-align: center;
        width: 5rem;
        color: #888;
    }
    .logWay span b{
        color: #333;
        font-size: 20px;
    }
</style>