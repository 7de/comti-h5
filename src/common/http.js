import axios from 'axios' 
import { cookie } from 'vux'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://www.comtti.net/merchant/'

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
    config => {
      const _token = cookie.get('token') //获取Cookie
      config.data = JSON.stringify(config.data)
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'//设置跨域头部
      }
      if (_token) {
        config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
      }
      return config
    },
    err => {
      return Promise.reject(err);
    }
)
// export default axios

/**
 * post 请求方法
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * get 请求方法
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
  