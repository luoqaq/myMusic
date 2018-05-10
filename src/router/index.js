import Home from '../components/home.vue';
import Search from '../components/search.vue';
import Raking from '../components/raking.vue';
import TopList from '../components/toplist.vue';
import mine from '../components/mine.vue';
import myLike from '../components/mine/like.vue';
import myFocus from '../components/mine/myFocus.vue';
import recommend from '../components/mine/recommend.vue'
import lastPlay from '../components/mine/lastPlay.vue';
import focusUserSongs from '../components/mine/focusUserSongs.vue';
import login from '../components/login/login.vue';
import regist from '../components/login/regist.vue'
const routes =[
    {path:'/home',component:Home},
    {path:'/search',component:Search},
    {path:'/raking',component:Raking},
    {path:'/',redirect:'/home'},
    {name:'toplist',path:'/toplist/:topid',component:TopList},
    {path: '/mine', component: mine},
    {path: '/mine/myLike', component: myLike},
    {path: '/mine/myFocus', component: myFocus},
    {path: '/mine/recommend', component: recommend},
    {path: '/mine/lastPlay', component: lastPlay},
    {path: '/focusUserSongs', component: focusUserSongs},
    {path: '/login', component: login},
    {path: '/regist', component: regist}
];

export default {routes}