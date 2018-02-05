import Vue from 'vue'
import {GET_SELLER_LIST_SUCCESS, GET_SELLER_LIST_FAILD, REQUEST_SELLER_LIST} from '../consts'

export default {
  state: {
    isFetching: false,
    items: []
  },
  mutations: {
    [GET_SELLER_LIST_SUCCESS] (state, items) {
      state.isFetching = false
      state.items = items
    },
    [GET_SELLER_LIST_FAILD] (state) {
      state.isFetching = false
      state.items = []
    },
    [REQUEST_SELLER_LIST] (state) {
      state.isFetching = true
    }
  },
  actions: {
    async getSellerList (store) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_SELLER_LIST)
      try {
        let res = await Vue.api.get('/users/me/sellerInfo/downlevels', {
          params: {
            "filter[include]":"wxInfo"
          }
        })
        store.commit(GET_SELLER_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_SELLER_LIST_FAILD)
        throw e
      }
    }
  }
}
