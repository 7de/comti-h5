import Vue from 'vue'
import Router from 'vue-router'
import { cookie } from 'vux'
// import Cookies from 'js-cookie'
// import {routers} from './router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 路由配置
/* const RouterConfig = {
  // mode: 'history',
  routes: routers
} */

// export const router = new Router(RouterConfig)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['@/views/login.vue'], resolve) }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => { require(['@/views/main.vue'], resolve) }
    },
    {
      path: '/today-fee',
      name: 'today-fee',
      component: resolve => { require(['@/views/today-fee.vue'], resolve) }
    },
    {
      path: '/total-fee',
      name: 'total-fee',
      component: resolve => { require(['@/views/total-fee.vue'], resolve) }
    },
    {
      path: '/today-order',
      name: 'today-order',
      component: resolve => { require(['@/views/today-order.vue'], resolve) }
    },
    {
      path: '/total-order',
      name: 'total-order',
      component: resolve => { require(['@/views/total-order.vue'], resolve) }
    },
    {
      path: '/money-back',
      name: 'money-back',
      component: resolve => { require(['@/views/money-back.vue'], resolve) }
    },
    {
      path: '/money-back-list',
      name: 'money-back-list',
      component: resolve => { require(['@/views/money-back-list.vue'], resolve) }
    },
    {
      path: '/money',
      name: 'money',
      component: resolve => { require(['@/views/money.vue'], resolve) }
    },
    {
      path: '/money-list',
      name: 'money-list',
      component: resolve => { require(['@/views/money-list.vue'], resolve) }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const nextRoute = ['home']
  let isLogin = cookie.get('token')
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      console.log('what fuck')
      router.push({ name: 'login' })
    }
  }
  if (to.name === 'login') {
    if (isLogin) {
      router.push({ name: 'home' })
    }
  }
  next()
  /* if (cookie.get('token')) {
    next({
      name: 'home'
    })
  } else {
    next({
      name: 'login'
    })
  } */
})
export default router
