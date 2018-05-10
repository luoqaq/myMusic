<template>
    <div class="navBar">
        <ul>
            <router-link to="/home" tag="li" active-class="targetNav">推荐</router-link>
            <router-link to="/mine" tag="li" active-class="targetNav">我的</router-link>
            <router-link to="/raking" tag="li" active-class="targetNav">排行榜</router-link>
        </ul>
    </div>
</template>
<style>
    .navBar {
        height: 7%;
        background: #fff;
        padding: 10px;
    }
    .navBar ul{
        display: flex;
        justify-content: space-around;
        /*height:6vh;*/
    }
    .navBar ul li{
        /*line-height: 6vh;*/
        font-size: 1.4rem;
        flex: 1;
        text-align: center;
    }
    .targetNav{
        border-bottom: 2px #333 solid;
    }
</style>