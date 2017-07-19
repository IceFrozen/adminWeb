import Vue from 'vue'
// import _ from 'lodash'
export default {
  state: {
    dateTime:null,
    mark:{
      lession1:[],
      lession2:[],
      lession3:[],
      askInput:[]
    },
    know:{
      lession1:[],
      lession2:[],
      lession3:[],
      askInput:[]
    }
  },
  mutations: {
    GET_INFO (state,ret) {
      state.dateTime = ret.dateTime
      if(ret.type === 'mark') {
        state.mark.lession1 = ret.lession1
        state.mark.lession2 = ret.lession2
        state.mark.lession3 = ret.lession3
        state.mark.lession3 = ret.lession3
        state.mark.askInput = ret.askInput
      }else {
        state.know.lession1 = ret.lession1
        state.know.lession2 = ret.lession2
        state.know.lession3 = ret.lession3
        state.know.askInput = ret.askInput
      }
    },
    CLEAR_INFO (state,ret) {
      state.dateTime = null
      state.mark.lession1 = []
      state.mark.lession2 = []
      state.mark.lession3 = []
      state.mark.lession3 = []
      state.mark.askInput = []
      state.know.lession1 = []
      state.know.lession2 = []
      state.know.lession3 = []
      state.know.askInput = []
    }
  },
  actions: {
    async getCheckInfo({commit, rootStore,dispatch},type) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let ret = (await Vue.api.post("/Marks/getCheckInfo", {
          type:type
        })).data
        commit('GET_INFO',ret)
        // console.log("this is mark list", ret)
        commit('updateLoadingStatus', {isLoading: false})
        return ret
      }catch(e) {
        commit('updateLoadingStatus', {isLoading: false})
        commit('CLEAR_INFO')
        return false
      }
    },
    async subMission ({commit, rootStore,dispatch},subObject) {
      // 提交任务
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let ret = (await Vue.api.post("/Marks/subMission_"+subObject.type, {
          lessions:subObject
        })).data
        // console.log("this is AskInfo", AskInfo)
        commit('updateLoadingStatus', {isLoading: false})
        return ret
      }catch(e) {
        commit('updateLoadingStatus', {isLoading: false})
        return false
      }
    }
  },
  modules: {}
}
