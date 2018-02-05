/*
  暂时弃用
*/
import Vue from 'vue'
import {GET_LINK_LIST_SUCCESS, GET_LINK_LIST_FAILD, REQUEST_LINK_LIST} from '../consts'

export default {
  state: {
    isFetching: false,
    items: [],
    sellers: [],
    players: []
  },
  mutations: {
    [GET_LINK_LIST_SUCCESS] (state, items) {
      state.isFetching = false
      state.items = items
      state.sellers = []
      state.players = []
      for (var link of items) {
        if (link.type === 'seller') {
          state.sellers.push(link)
        } else {
          state.players.push(link)
        }
      }
    },
    [GET_LINK_LIST_FAILD] (state) {
      state.isFetching = false
      state.items = []
      state.sellers = []
      state.players = []
    },
    [REQUEST_LINK_LIST] (state) {
      state.isFetching = true
    }
  },
  actions: {
    async getLinkList (store) {
      if (store.state.isFetching) {
        return
      }
      store.commit(REQUEST_LINK_LIST)
      try {
        let res = await Vue.api.get('/users/me/sellerInfo/links')
        store.commit(GET_LINK_LIST_SUCCESS, res.data)
        let refatch = false
        if (store.state.sellers.length < 1) {
          refatch = true
          await Vue.api.post('/users/me/sellerInfo/links', {type: 'seller'})
        }
        if (store.state.players.length < 1) {
          refatch = true
          await Vue.api.post('/users/me/sellerInfo/links', {type: 'player'})
        }
        if (refatch) {
          await store.dispatch('getLinkList')
        }
      } catch (e) {
        store.commit(GET_LINK_LIST_FAILD)
        throw e
      }
    }
  }
}
