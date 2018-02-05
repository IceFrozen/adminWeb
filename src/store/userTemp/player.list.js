import Vue from 'vue'
import {GET_PLAYER_LIST_SUCCESS, GET_PLAYER_LIST_FAILD, REQUEST_PLAYER_LIST} from '../consts'

export default {
  state: {
    isFetching: false,
    items: []
  },
  mutations: {
    [GET_PLAYER_LIST_SUCCESS] (state, items) {
      state.isFetching = false
      state.items = items
    },
    [GET_PLAYER_LIST_FAILD] (state) {
      state.isFetching = false
      state.items = []
    },
    [REQUEST_PLAYER_LIST] (state) {
      state.isFetching = true
    }
  },
  actions: {
    async getPlayerList (store) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_PLAYER_LIST)
      try {
        let res = await Vue.api.get('/users/me/sellerInfo/players?filter[include]=user', {
          params: {
            "filter[include]":"orders"
          }
        })
        store.commit(GET_PLAYER_LIST_SUCCESS, res.data)
      } catch (e) {
        store.commit(GET_PLAYER_LIST_FAILD)
        throw e
      }
    }
  }
}
