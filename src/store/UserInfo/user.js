import Vue from 'vue'
import { USER_SIGNIN, USER_SIGNOUT } from '../consts'
// import linkList from './user/link.list'
// import sellerList from './user/seller.list'
// import sellerDetails from './user/seller.details'
// import playerList from './user/player.list'
// import playerDetails from './user/player.details'
// import sellerInfo from './user/sellerInfo'
// import adminInfo from './user/adminInfo'
// import Promise from 'bluebird'
import Check from '../yixue/check'
import Mark from '../yixue/mark'
import ViewItems from './ViewItems'
export default {
  state: {
    id: null,
    accessToken: null,
    playerInfo: null,
    userinfo:null
  },
  mutations: {
    [USER_SIGNIN] (state, user) {
      Object.assign(state, user)
    },
    [USER_SIGNOUT] (state) {
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    async login ({commit, rootStore,dispatch}, user) {
      commit('updateLoadingStatus', {isLoading: true})
      window.sessionStorage.setItem("account",JSON.stringify({id:user.id,accessToken:user.accessToken}))
      let info = (await Vue.api.get("/users/me?access_token="+user.accessToken)).data
      user.userinfo = info
      let playerInfo = (await Vue.api.get("/users/me/wxInfo?access_token="+user.accessToken)).data
      user.playerInfo = playerInfo
      commit(USER_SIGNIN, user)
      // await Promise.map(["getSellerList","getLinkList","getSellerInfo","getAdminInfo","getPlayerList"],(type) => dispatch(type))
      await Promise.map(["getAskInfo"],(type) => dispatch(type))
      commit('updateLoadingStatus', {isLoading: false})
    },
    logout ({commit}) {
      window.sessionStorage.removeItem("account")
      commit(USER_SIGNOUT)
    },
    async updateUserInfo ({commit, rootStore,dispatch}, userinfo) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let user = (await Vue.api.post("/users/me/updateInfo",{userinfo})).data
        let info = (await Vue.api.get("/users/me")).data
        user.userinfo = info
        commit(USER_SIGNIN, user)
        commit('updateLoadingStatus', {isLoading: false})
        return true
      }catch(e) {
        commit('updateLoadingStatus', {isLoading: false})
        return false
      }
    }
  },
  modules: { Check, Mark, ViewItems, Statistics }
}
