import Vue from 'vue'
import {GET_SELLER_DETAILS_SUCCESS, GET_SELLER_DETAILS_FAILD, REQUEST_SELLER_DETAILS, UPDATE_USER_COIN} from '../consts'

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
    },
    sellerInfo:{

    }
  },
  mutations: {
    [GET_SELLER_DETAILS_SUCCESS] (state,payload) {
      state.isFetching = false
      state.id = payload.id
      state.userInfo = {
        coin: payload.coin
      }
      state.wxInfo = payload.wxInfo
      state.sellerInfo = payload.sellerInfo
    },
    [GET_SELLER_DETAILS_FAILD] (state) {
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
      state.sellerInfo = {}
    },
    [REQUEST_SELLER_DETAILS] (state) {
      state.isFetching = true
      state.id = null
    }
  },
  actions: {
    async getSellerDetails (store,id) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_SELLER_DETAILS)
      try {
        let res = await Vue.api.get('/users/'+id + "?filter[include]=wxInfo&filter[include]=sellerInfo")
        res.data.id = id
        store.commit(GET_SELLER_DETAILS_SUCCESS,res.data)
      } catch (e) {
        store.commit(GET_SELLER_DETAILS_FAILD)
        throw e
      }
    },
    async transferCoinToSeller (store, num) {
      await Vue.api.post("/sellerInfos/"+store.rootState.user.id+"/transferCoinToSeller",{
        sellerId:store.state.id,
        num:num
      })

      await store.dispatch('getSellerDetails',store.state.id)
      await store.commit(UPDATE_USER_COIN,store.rootState.user.coin - num)
    }
  }
}
