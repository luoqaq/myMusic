<template>
    <div class="playBar">
        <v-musiclist></v-musiclist>
        <ul class="playBar_box">
            <li class="playBar_l">
                <img :src="songImg" @click="showPlayInfo" :style="'animation-play-state:' + animateSate">
            </li>
            <li class="playBar_m">
                <h1 class="songName">{{songInfo.name}}</h1>
                <p class="singerName">{{songInfo.singer}}</p>
            </li>
            <li class="playBar_r">
                <button @click="play" :class="playBtnClass"></button>
                <!-- <button @click="nextMusic" class="iconfont icon-next"></button> -->
                <button @click.stop="openListState" class="iconfont icon-menu-music"></button>
            </li>
        </ul>
    </div>
</template>
<script>
    import MusicList from './musicList.vue'
    import {mapActions,mapGetters} from 'vuex'
    export default{
        data(){
            return{
                animateSate: 'paused'
            }
        },
        methods:mapActions(['play','nextMusic','openListState','closeListState','showPlayInfo']),
        computed:mapGetters(['playBtnClass','currentTime','duration','songImg','songInfo','playState']),
        components:{
            'v-musiclist':MusicList
        },
        watch: {
            playState: function(){
                this.animateSate = this.playState ? 'running' : 'paused'
            }
        }
    }
</script>
<style>
    .playBar{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }
    .playBar_box{
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: .5rem;
        background: #fff;
        border-top: 1px solid #eee;
    }
    .playBar_l{
        height:12vw;
        width: 12vw;
        max-width: 90px;
        max-height: 90px;
    }
    .playBar_l img{
        width: 12vw;
        max-width: 86px;
        max-height: 86px;
        border-radius: 50%;
        margin: auto 0;
    }
    .playBar_m{
        flex: 1;
        padding-left: .5rem;
        width: 50%;
    }
    .playBar_m>.songName{
        font-size: 1.2rem; 
    }
    .playBar_m>.singerName{
        font-size: 1rem;
    }
    .playBar_r button{
        font-size: 2.2rem;
        margin-right: .5rem;
    }

    @keyframes rotate{
        0% {
            transform:rotate(0deg);
            -ms-transform:rotate(0deg); /* IE 9 */
            -webkit-transform:rotate(0deg); /* Safari and Chrome */
        }
        50% {
            transform:rotate(180deg);
            -ms-transform:rotate(180deg); /* IE 9 */
            -webkit-transform:rotate(180deg); /* Safari and Chrome */
        }
        100% {
            transform:rotate(360deg);
            -ms-transform:rotate(360deg); /* IE 9 */
            -webkit-transform:rotate(360deg); /* Safari and Chrome */
        }
    }
    .playBar_l img{
        animation-name: rotate;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        -webkit-animation-name: rotate;
        -webkit-animation-duration: 5s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
    }
</style>
