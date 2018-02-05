<template>
  <div>
    <div class="center">
      <h2 class="vux-title">
        易和书院微信客户端 v{{version}}
      </h2>
      <p class="vux-notice" v-if="state.user.id">微信名：{{state.user.nick}}</p>
    </div>
  </div>
</template>

<script>
const version = require('../../../package.json').version
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      version: version,
      code:""
    }
  },
  mounted () {
    if (!this.$route.query['code'] || !this.$route.query['state']) {
      return this.$router.push('/wx/jumpToWechat')
    }
    if(this.user.id) {
      return this.$router.replace('/home')
    }
    let code = this.$route.query['code']
    if(this.code === code) {
      return this.$router.replace('/jumpToWechat')
    }
    this.code = code
    this.$api.post('users/loginWithWechat', {wxCode: code})
      .then((res) => {
        let data = res.data
        return this.doLogin({
          id: data.userId,
          accessToken: data.id
        })
      })
      // .then(() => {
      //   return this.$api.get(`/wxH5Config?url=${encodeURIComponent(location.href.split('#')[0])}`)
      // })
      // .then((res) => {
      //   console.log("hrconfig",res.data)
      //   this.$wechat.config(res.data)
      //   return new Promise((resolve) => {
      //     this.$wechat.ready(() => {
      //       resolve()
      //     })
      //     this.$wechat.error(() => {
      //       this.$api.get(`/wxH5Config?url=${encodeURIComponent(location.href.split('#')[0])}`).then(res => this.$wechat.config(res.data))
      //     })
      //   })
      // })
      .then(() => {
        this.$router.replace('/home')
      })
      .catch(() => {
        alert("服务器异常，请重新进入")
        this.$router.replace('/jumpToWechat')
      })
  },
  methods: {
    ...mapActions({
      doLogin: 'login'
    })
  },
  computed: {
    ...mapState({
      state: state => state,
      route: state => state.route,
      path: state => state.route.path,
      user: state => state.user
    })
  }
}
</script>

<style lang="less">
.center {
  margin-top: 15px;
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 0px;
}
.demo-icon {
  margin-right: 15px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
</style>
