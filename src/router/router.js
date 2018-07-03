export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/views/login.vue'], resolve) }
}
export const mainRouter = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: resolve => { require(['@/components/HelloFromVux.vue'], resolve) }
  }
]

export const routers = [
  loginRouter,
  mainRouter
]
