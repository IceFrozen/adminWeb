import Vue from 'vue'
import {GET_SELLER_INFO_SUCCESS, GET_SELLER_INFO_FAILD, REQUEST_SELLER_INFO, REQUEST_FINSH} from '../consts'

export default {
  state: {
    isFetching: false,
    rebate:0,
    level:-1,
    id:null,
    history:[],
    rebates:[]
  },
  mutations: {
    [GET_SELLER_INFO_SUCCESS] (state, data) {
      state.isFetching = false
      state.id = data.sellerId
      state.level = data.level
      state.rebates = data.rebates.reverse()
      let tmp = 0
      state.rebates.map(t => {
        tmp += t.cash
      })
      state.rebate = tmp
    },
    [GET_SELLER_INFO_FAILD] (state) {
      state.isFetching = false
      state.id = null
      state.rebate = 0
    },
    [REQUEST_SELLER_INFO] (state) {
      state.isFetching = true
    },
    [REQUEST_FINSH] (state) {
      state.isFetching = false
    }
  },
  actions: {
    async getSellerInfo (store) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_SELLER_INFO)
      try {
        let res = await Vue.api.get('/SellerInfos/'+store.rootState.user.id+"/getTotalRebate")
        store.commit(GET_SELLER_INFO_SUCCESS,res.data)
      } catch (e) {
        console.log(e)
        store.commit(GET_SELLER_INFO_FAILD)
        // throw e
      }
    },
    async applyCash (store,money) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_SELLER_INFO)
      try {
        let res = await Vue.api.post('/SellerInfos/'+store.rootState.user.id+'/transferRebate')
        store.commit(REQUEST_FINSH)
        return res
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async applyCash_history (store,money) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_SELLER_INFO)
      try {
        let res = await Vue.api.get('/SellerInfos/'+store.rootState.user.id+'/ApplyCashInfo')
        store.commit(REQUEST_FINSH)
        return res
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}


