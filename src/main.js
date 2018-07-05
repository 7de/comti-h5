// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import qs from 'qs'
import router from './router/index'
import { AjaxPlugin, ToastPlugin, Actionsheet, LoadingPlugin } from 'vux'
import VueScroller from 'vue-scroller'
import App from './App'

import './common/validate.js'

// Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueScroller)

Vue.component('actionsheet', Actionsheet)

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

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app-box')
