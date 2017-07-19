import Vue from 'vue'
import _ from 'lodash'
export default {
  state: {
    id: null,
    AskInfo: null,
    Groups:[]
  },
  mutations: {
    GET_INFO (state, AskInfo) {
      state.id = AskInfo.id
      state.Groups = AskInfo.groups
      delete AskInfo.groups
      state.AskInfo = AskInfo
    },
    GET_INFO_FAILD (state) {
      state.id = null
      state.AskInfo = null
      state.Groups = []
    },
    FenShuw (state,{groupId,questioId,selectId}) {
      if(!state.id) {
        return
      }
      let group = _.find(state.Groups,{groupId:groupId})
      let question = _.find(group.questions,{questioId:questioId})
      let select = _.find(question.selects,{key:selectId})
      if(!select || !group || !question) {
        return
      }
      question.select = selectId
      let tmp = 0
      group.questions.map(q => {
        let sitem = _.find(q.selects,{key:q.select})
        if(!sitem) {
          return
        }
        tmp += parseInt(sitem.score)
      })
      group.fen = tmp
    }
  },
  actions: {
    async getQuestion ({commit, rootStore,dispatch}, userinfo) {
      try{
        commit('updateLoadingStatus', {isLoading: true})
        let AskInfo = (await Vue.api.post("/Questions/getQuestion")).data
        commit("GET_INFO", AskInfo.Ask)
        // console.log("this is AskInfo", AskInfo)
        commit('updateLoadingStatus', {isLoading: false})
        return true
      }catch(e) {
        commit('updateLoadingStatus', {isLoading: false})
        return false
      }
    },
    complateGroupFen (store, {groupId,questioId,selectId}) {
      store.commit("FenShuw", {groupId,questioId,selectId})
    },
    async submitCheck (store) {
      let askInfo = {
        id:store.state.id,
        total:0,
        group:[]
      }
      let tmp = 0
      store.state.Groups.map(g => {
        tmp += g.fen
        let grouInfo = {
          name:g.name,
          index:g.index,
          questions:[],
          fen:g.fen
        }
        g.questions.map(q => {
          let select = q.select
          let selectInfo = _.find(q.selects, {key:select})
          grouInfo.questions.push({
            questionName:q.name,
            questionIndex:selectInfo.index,
            questionAnswer:selectInfo.value,
            questionSorce:selectInfo.score
          })
        })
        askInfo.group.push(grouInfo)
      })
      askInfo.total = tmp
      try{
        store.commit('updateLoadingStatus', {isLoading: true})
        let isSucc = (await Vue.api.post("/Questions/"+askInfo.id+"/subQuestion",{askInfo})).data
        // console.log("isSucc", isSucc)
        store.commit('updateLoadingStatus', {isLoading: false})
        return isSucc
      }catch(e) {
        store.commit('updateLoadingStatus', {isLoading: false})
        return {isSucc:-1,msg:"error"}
      }
    }
  },
  modules: {}
}
