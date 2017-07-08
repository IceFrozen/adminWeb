import Vue from 'vue'
import Promise from 'bluebird'

export const wxLogin = (store, wxCode) => {
  return Vue.api.post("users/loginWithWechat",{wxCode})
    .then(res => {
      const body = res.body
      const accessToken = body.id
      const userid = body.userId
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export const getLinkList = () => {

}
