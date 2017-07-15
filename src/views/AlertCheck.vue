<template>
  <div>
    <msg :title="ret.msg" :description="ret.msg" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>
<script>
import { Msg, Divider, XButton } from 'vux'
export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  mounted () {
    this.ret = this.$route.params.ret
    if(this.ret.isSucc === 0) {
      this.icon = 'success'
    }else{
      this.icon = 'warn'
    }
  },
  methods: {
    changeIcon () {
      this.$vux.alert.show({
        content: `正在开发中`
      })
    }
  },
  data () {
    return {
      description: 'msg description',
      icon: '',
      ret:null,
      buttons: [{
        type: 'primary',
        text: '查看走势图',
        onClick: this.changeIcon.bind(this)
      }, {
        type: 'default',
        text: '返回',
        link: '/home/yixue'
      }]
    }
  }
}
</script>
