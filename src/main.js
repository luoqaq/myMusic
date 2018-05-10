// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import 'animate.css'//导入动画组件

import VueResource from 'vue-resource'//导入数据交互模块
Vue.use(VueResource);

import './assets/css/reset.css'//导入全局reset
import './assets/css/iconfont.css' //导入icon字体库

import VueRouter from 'vue-router';//导入路由
Vue.use(VueRouter);
import routes from './router/index';//导入路由配置文件
const router =new VueRouter(routes);//创建路由实列

import store from './store';//全局挂载状态管理

import museUi from 'muse-ui';//使用museUI
import 'muse-ui/dist/muse-ui.css'
Vue.use(museUi);

import loading from './components/loading';//动态加载动画
Vue.use(loading);

const fastClick = require('fastclick') //解决点击延迟问题
fastClick.attach(document.body)

Vue.http.interceptors.push((request, next) => {
    store.dispatch('showLoading');
    setTimeout(function () {
          store.dispatch('hidLoading')
      },100);
    next((response) => {
        return response
    });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
