<template>
    <div class="header">
        <ul class="header-ul">
            <li><a href="javascript:;" class="iconfont" @click="open('left')"><b class="icon-menu"></b></a></li>
            <li><a href="javascript:;">音乐</a></li>
            <li>
                <a href="javascript:;" @click="search" class="iconfont"><b class="icon-search"></b></a>
            </li>
        </ul>
        <mu-popup position="left" popupClass="popup" :open="leftPopup" @close="close('left')">
        <div class="overFS">
            <div class="leftMuH">
                <p class="portrait"></p>
                <p class="userInfo">
                    <span>{{this.$store.state.user.name === 'empty'? (this.$store.state.user.tel === 'empty'? '还未登录' : this.$store.state.user.tel) : this.$store.state.user.name}}</span>
                </p>
            </div>
            <ul class="optionsList">
                <li v-if="!isLogin" class="li-login" @click="login"><i>~ 立即登录 ~</i></li>
                <li><b class="iconfont icon-message"></b>&nbsp;&nbsp;我的消息</li>
                <li><b class="iconfont icon-changeBgC"></b>&nbsp;&nbsp;个性换肤</li>
                <li><b class="iconfont icon-vip"></b>&nbsp;&nbsp;VIP会员</li>
                <li><b class="iconfont icon-shop"></b>&nbsp;&nbsp;商城</li>
            </ul>
            <ul class="optionsList">
                <li><b class="iconfont icon-people"></b>&nbsp;&nbsp;关于作者</li>
                <li><b class="iconfont icon-return"></b>&nbsp;&nbsp;意见反馈</li>
                <li><b class="iconfont icon-edition"></b>&nbsp;&nbsp;版本说明 v1.2.0</li>
            </ul>
            <div class="botome-fixed">
                <span><b class="iconfont icon-set"></b>&nbsp;设置</span>
                <span class="fr" @click="exit"><b class="iconfont icon-exit"></b>&nbsp;退出</span>
            </div>
        </div>
        </mu-popup>
    </div>
</template>
<script>
    import blur from '../../node_modules/vux/src/components/blur'
    export default{
        components: {
            blur
        },
        data(){
            return{
                leftPopup: false,
                userInfo:{
                    name: '未还登录',
                    img: '/src/assets/img/landing_bg.jpg'
                }
            }
        },
        methods:{
            open (position) {
                this[position + 'Popup'] = true
            },
            close (position) {
                this[position + 'Popup'] = false
            },
            search () {
                this.$router.push('/search')
            },
            login () {
                this.close('left')
                this.$router.push('/login')
            },
            exit () {
                var user = {
                        name: 'empty',
                        tel: 'empty',
                        img: 'empty',
                        qq: 'empty',
                        wx: 'empty',
                        wb: 'empty'
                    }
                this.$store.dispatch('isLogin', false)
                this.$store.dispatch('changeUser', user)
                sessionStorage.removeItem('isLogin');
                sessionStorage.removeItem('user')
                this.userInfo = {
                    name: '未还登录',
                    img: '/src/assets/img/landing_bg.jpg'
                }
            }
        },
        computed: {
            isLogin: {
                get: function() {
                    return this.$store.state.isLogin
                },
                set: function(v) {
                    this.$store.state.isLogin = v
                }
            }
        },
        watch: {
            isLogin: function () {
                this.isLogin = this.$store.state.isLogin
                if (this.$store.state.user.tel !== 'empty') {
                    if (this.$store.state.user.name === 'empty') {
                        this.userInfo.name = this.$store.state.tel
                    } else {
                        this.userInfo.name = this.$store.state.name
                    }
                } else {

                }
            }
        },
        mounted () {
            console.log('header')
            if (this.isLogin) {
                console.log(this.$store.state.user)
                if (this.$store.state.user.tel !== 'empty') {
                    if (this.$store.state.user.name === 'empty') {
                        this.userInfo.name = this.$store.state.user.tel
                    } else {
                        this.userInfo = {
                            name: '未还登录',
                            img: '/src/assets/img/landing_bg.jpg'
                        }
                    }
                }
            }
        }
    }
</script>
<style>
    .header{
        position: relative;
        height: 5%;
        padding: 5px;
    }
    .header ul{
        /*height:6vh;
        line-height: 6vh;*/
        display: flex;
        justify-content: space-between;
    }
    .header ul li a{
        font-size: 1.6rem;
        color: #000;
    }
    .header-ul li {
        padding: 0 5px;
    }
    .popup {
        width: 80%;
        max-width: 375px;
        height: 100%;
        position: absolute;
        left: 0;
        font-size: 18px;
    }
    .leftMuH{
        height: 30vh;
        padding-top: 5vh;
        background:url("../assets/img/landing_bg.jpg") no-repeat center;
        background-size: cover;
    }
    .leftMuH p {
        margin: 3% 8%;
        width: 80px;
        color: #fff;
        text-align: center;
    }
    .portrait{
        width:80px;
        height:80px;
        background: url("../assets/img/head_portrait.jpg") no-repeat center;
        background-size:cover ;
        border-radius: 40px;
        margin-bottom: 10px;
    }
    .userInfo{
        color: #00e09e;
    }
    .userInfo span{
        display: block;
        margin-top: 1rem;
        font-size: 1.4rem;
    }
    .li-login {
        text-align: center;
    }
    .li-login i {
        color: #e57373;
    }
    .optionsList{
        background: #fff;
        margin-top: 1rem;
    }
    .optionsList li{
        font-size: 1.6rem;
        line-height: 6vh;
        padding-left: 1.5rem;
        color: #333;
    }

    .optionsList li b{
        font-size: 1.6rem;
        font-weight: 400;
        color: #aaa;
    }
    .optionsList li:hover{
        background: #aaa;
    }
    .botome-fixed {
        width: 100%;
        padding: 1.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #999;
        background-color: #fff;
    }
    .botome-fixed span{
        font-size: 1.6rem;
    }
    .botome-fixed span b{
        font-size: 1.6rem;
        font-weight:400;
    }
</style>