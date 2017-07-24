import Vue from 'vue'
import _ from 'lodash'
export default {
  state: {
    check:[]
  },
  mutations: {
    GET_INFO (state, AskInfo) {
      state.check = AskInfo.reverse()
    }
  },
  actions: {
    async getAskInfo ({commit, rootStore,dispatch}) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let AskInfo = (await Vue.api.post("/Asks/getAskInfo")).data
        let sortTime = _.sortBy(AskInfo.ret, ['time'])
        commit("GET_INFO", sortTime)
        commit('updateLoadingStatus', {isLoading: false})
        return true
      }catch(e) {
        console.log(e)
        commit('updateLoadingStatus', {isLoading: false})
        return false
      }
    }
  },
  modules: {}
}
