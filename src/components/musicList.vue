<template>
    <transition
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
    >
    <div class="musicList_box" v-show="getListState">
        <h1>播放列表（{{getList?getList.length:0}}首）</h1>
    <ul class="musicList">
        <li v-for="(val,index) in getList" :class="{playing:getMusicPlace==index}">
            <b  @click.stop="selectMusic(index)">
                {{val?val.name:你还没有添加列表}}
            </b>
            <button class="iconfont icon-close" @click.stop="delMusic(index)"></button>
        </li>
    </ul>
        <a href="javascript:;" class="closeList" @click="closeListState">关闭</a>
    </div>
    </transition>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    export default{
        computed:mapGetters(['getList','getListState','getMusicPlace']),//actions.js里有注释功能
        methods:mapActions(['closeListState','selectMusic','delMusic'])//getters.js里有注释功能
    }
</script>
<style>
    .musicList_box{
        position: fixed;
        height:46vh;
        bottom: 0;
        z-index: 100;
        right:0;
        width: 100%;
        overflow: auto;
        background: rgba(230, 230, 230, .9);
    }
    .musicList .playing{
        color: #e57373;;
    }
    .musicList_box h1{
        text-align: center;
        color: #000;
        height:3vh;
        line-height: 3vh;
        font-size: 1.3rem;
    }
    .musicList{
        overflow: auto;
        height: 25vh;
    }
    .musicList li{
        display: flex;
        justify-content: space-between;
        height:5vh;
        color: #000;
        line-height: 5vh;
        padding: 2px;
        font-size: 1.2rem;
    }
    .musicList li button{
        color: #000;
        margin-right: 1rem;
    }
    .musicList li b{
        display: block;
        width: 60%;
        padding-left: .5rem;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .closeList{
        position: fixed;
        bottom: 10px;
        display: block;
        width: 100%;
        color: #000;
        text-align: center;
        line-height: 5vh;
        font-size: 1.2rem;
    }
</style>