import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$base = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  // console.log('请求之前', config)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应之后', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    router.push('/login')
    Toast.fail('验证失败，重新登录')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
