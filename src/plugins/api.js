import axios from 'axios'
import store from '../store'
let instance = axios.create({
  baseURL: 'http://wx.mahjong.haowan98.com:3001/api'
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.user.accessToken) {
    config.headers.common['Authorization'] = store.state.user.accessToken
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default {
  install (Vue) {
    Vue.prototype.$api = instance
    Vue.api = instance
  },
  instance
}
