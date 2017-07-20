<template>
  <div>
    <div class="center">
      <h2 class="vux-title">
        易和书院 v{{version}}
      </h2>
      <p class="vux-notice">正在登陆...</p>
    </div>
  </div>
</template>

<script>
const version = require('../../../package.json').version
const appConfig = require('../../appConfig.js')
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      version: version
    }
  },
  created () {
    let appid = appConfig.appId
    let redirectUri = encodeURIComponent(appConfig.redirectUri)

    let url = `/https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=mahjong#wechat_redirect`
    /*
    let url = `/https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=mahjong#wechat_redirect`

    */
    /*
      https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe475d3fe30b0ff1b&redirect_uri=http://lizhipeng.space&response_type=code&scope=snsapi_login&state=mahjong&connect_redirect=1#wechat_redirect
    */
    // this.$router.push(url)
    // url = 'http://www.baidu.com'
    // alert(url)
    this.$router.push(url)
  },
  methods: {
    ...mapActions(["login"])
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

<style lang="less" scoped>
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
