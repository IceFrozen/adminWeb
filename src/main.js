import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import router from './router'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import FastClick from 'fastclick'
import api from './plugins/api'
import lodash from './plugins/lodash'
import VCharts from 'v-charts'

import { DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, XInput } from 'vux'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(XInput)
Vue.use(api)
Vue.use(lodash)
Vue.use(VCharts)

sync(store, router)

router.beforeEach(function ({path, meta, fullPath}, from, next) {
  if (/^\/http/.test(fullPath)) {
    fullPath = fullPath.substr(1)
    window.location.href = fullPath
    return
  }
  let { requiresAuth = true } = meta
  let isLogin = !!store.state.user.id // true用户已登录， false用户未登录
  if (requiresAuth && !isLogin) {
    return next({ path: '/login' })
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  store.commit('updateDirection', {direction: 'forward'})
  next()
  // Vue.api.get(`/wxH5Config?url=${encodeURIComponent("http://wx.mahjong.haowan98.com"+fullPath)}`)
  //   .then(res => {
  //
  //     Vue.wechat.config(res.data)
  //   })
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})


FastClick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
