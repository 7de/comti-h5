// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import qs from 'qs'
// import es6Promise from 'es6-promise'
import router from './router/index'
import { AjaxPlugin, ToastPlugin } from 'vux'
// import { AjaxPlugin, ToastPlugin, cookie } from 'vux'
// import { ToastPlugin } from 'vux'
import App from './App'

import './common/validate.js'
// import Home from './components/HelloFromVux'

// Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
AjaxPlugin.$http.defaults.withCredentials = true
AjaxPlugin.$http.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

AjaxPlugin.$http.interceptors.request.use((config) => {
  // 发送请求之前做某件事
  /* if (cookie.get('token')) {
    console.log('请求头' + cookie.get('token'))
    config.headers = {
      'cookies': 'token=' + cookie.get('token')
    }
  } */
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return error
})
/*
AjaxPlugin.$http.interceptors.response.use((config) => {
  if (cookie.get('token')) {
    console.log('请求头' + cookie.get('token'))
    config.headers = {
      'Cookies': 'token=' + cookie.get('token')
    }
  }
}, (error) => {
  return error
}) */

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app-box')
