import Vue from 'vue'
import {GET_PLAYER_DETAILS_SUCCESS, GET_PLAYER_DETAILS_FAILD, REQUEST_PLAYER_DETAILS, UPDATE_USER_COIN} from '../consts'

export default {
  state: {
    isFetching: false,
    id: null,
    wxInfo: {
      wxOpenid:undefined,
      wxNickname:undefined,
      wxHeadimgurl:undefined,
      wxUnionid:undefined
    },
    userInfo:{
      coin: 0
    }
  },
  mutations: {
    [GET_PLAYER_DETAILS_SUCCESS] (state,payload) {
      state.isFetching = false
      state.id = payload.id
      state.userInfo = {
        coin: payload.coin
      }
      state.wxInfo = payload.wxInfo
    },
    [GET_PLAYER_DETAILS_FAILD] (state) {
      state.isFetching = false
      state.id = null
      state.userInfo = {
        coin: 0
      }
      state.wxInfo = {
        wxOpenid:undefined,
        wxNickname:undefined,
        wxHeadimgurl:undefined,
        wxUnionid:undefined
      }
    },
    [REQUEST_PLAYER_DETAILS] (state) {
      state.isFetching = true
      state.id = null
    }
  },
  actions: {
    async getPlayerDetails (store,id) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_PLAYER_DETAILS)
      try {
        let res = await Vue.api.get('/users/'+id + "?filter[include]=wxInfo")
        res.data.id = id
        store.commit(GET_PLAYER_DETAILS_SUCCESS,res.data)
      } catch (e) {
        store.commit(GET_PLAYER_DETAILS_FAILD)
        throw e
      }
    }
  }
}
