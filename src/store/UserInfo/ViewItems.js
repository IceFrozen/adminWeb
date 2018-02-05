// import Vue from 'vue'
// import _ from 'lodash'
export default {
  state: {
    bottomMemu:[],
    serviceMemu:[]
  },
  mutations: {
    GET_INFO (state) {},
    GET_INFO_FAILD (state) {}
  },
  actions: {
    async getViewItem ({commit, rootStore,dispatch}, userinfo) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        // let MemuInfo = (await Vue.api.post("/userInfo/getMemuInfo")).data
        // commit("GET_INFO", AskInfo.Ask)
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
