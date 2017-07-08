import Vue from 'vue'
import {GET_ADMIN_INFO_SUCCESS, GET_ADMIN_INFO_FAILD, REQUEST_ADMIN_INFO} from '../consts'

export default {
  state: {
    isFetching: false,
    isAdmin:false
  },
  mutations: {
    [GET_ADMIN_INFO_SUCCESS] (state, isAdmin) {
      state.isFetching = false
      state.isAdmin = isAdmin
    },
    [GET_ADMIN_INFO_FAILD] (state) {
      state.isFetching = false
    },
    [REQUEST_ADMIN_INFO] (state) {
      state.isFetching = true
    }
  },
  actions: {
    async getAdminInfo (store) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_ADMIN_INFO)
      try {
        await Vue.api.get('/users/me/adminInfo')
        store.commit(GET_ADMIN_INFO_SUCCESS, true)
      } catch (e) {
        store.commit(GET_ADMIN_INFO_SUCCESS, false)
      }
    },
    async generateCoin(store,num) {
      let selfId = store.rootState.user.id
      let res = await Vue.api.post(`/AdminInfos/${selfId}/generateCoin`,{num:num})

      let newCoin = res.data
      store.commit("UPDATE_USER_COIN",newCoin)
    }
  }
}
