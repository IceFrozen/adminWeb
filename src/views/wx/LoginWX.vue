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
      version: version
    }
  },
  mounted () {
    if (!this.$route.query['code'] || !this.$route.query['state']) {
      return this.$router.push('/wx/jumpToWechat')
    }
    let code = this.$route.query['code']
    this.$api.post('users/loginWithWechat', {wxCode: code})
      .then((res) => {
        let data = res.data
        return this.doLogin({
          id: data.userId,
          accessToken: data.id,
          coin: data.coin
        })
      })
      .then(() => {
        return this.$api.get(`/wxH5Config?url=${encodeURIComponent(location.href.split('#')[0])}`)
      })
      .then((res) => {
        console.log("hrconfig",res.data)
        this.$wechat.config(res.data)
        return new Promise((resolve) => {
          this.$wechat.ready(() => {
            resolve()
          })
          this.$wechat.error(() => {
            this.$api.get(`/wxH5Config?url=${encodeURIComponent(location.href.split('#')[0])}`).then(res => this.$wechat.config(res.data))
          })
        })
      })
      .then(() => {
        this.$router.replace('/home')
      })
      .catch(() => {
        alert("链接异常，请联系您的推广人员索要正确的推广链接")
        this.$router.replace('/jumpToWechat')
      })
  },
  methods: {
    ...mapActions({
      getLinkList: 'getLinkList',
      doLogin: 'login'
    })
  },
  computed: {
    ...mapState({
      state: state => state,
      route: state => state.route,
      path: state => state.route.path
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
