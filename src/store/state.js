export default {
    dom:'',//音乐播放元素
    musicPlace:-1,//当前播放位置
    musicList:[],//音乐列表
    playState:false,//播放按钮状态
    currentTime:0,//音乐播放进度
    duration:0,//音乐长度
    listState:false,//播放列表状态
    isLoadingShow:false,//是否显示loading
    isShowPlayInfo:false,//是否显示播放详情页,
    isLogin: sessionStorage.getItem('isLogin')||false, //是否已登录
    baseUrl: 'http://63.209.33.129:8090', //接口的基地址
    // baseUrl: 'http://127.0.0.1:8090', //接口的基地址
    user: {
        name: (sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user')).name)||'empty',
        tel: (sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user')).tel)||'empty',
        img: (sessionStorage.getItem('user')&&JSON.parse(sessionStorage.getItem('user')).img)||'empty',
        qq: 'empty',
        wx: 'empty',
        wb: 'empty'
    },
    musicUrl: 'http://dl.stream.qqmusic.qq.com/C100',
    musicUrlPa: '.m4a?fromtag=0',
    likeSongs: []
}