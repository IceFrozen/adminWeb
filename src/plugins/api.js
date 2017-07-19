import axios from 'axios'
import store from '../store'
var appConfig = require('../appConfig.js')
let instance = axios.create({
  baseURL: appConfig.baseURL
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
