import Vue from 'vue'
// import _ from 'lodash'
export default {
  state: {
  },
  mutations: {
    GET_INFO (state) {},
    GET_INFO_FAILD (state) {}
  },
  actions: {
    async getViewItem ({commit, rootStore,dispatch}, userinfo) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let AskInfo = (await Vue.api.post("/Questions/getQuestion")).data
        commit("GET_INFO", AskInfo.Ask)
        commit('updateLoadingStatus', {isLoading: false})
        return true
      }catch(e) {
        commit('updateLoadingStatus', {isLoading: false})
        return false
      }
    }
  },
  modules: {}
}
/*
	1、底部
	2、功能列表
		{
			name:
			linkto:
			img:
		}
*/