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
    this.ret = this.$route.params.askInfo
    console.log("this.$route.params", this.$route.params)
    if(this.ret.isSucc === 0) {
      this.icon = 'success'
    }else{
      this.icon = 'warn'
    }
    if(this.ret.total !== undefined) {
      let total = this.ret.total
      this.buttons.push({
        type:"default",
        text:"总分：" + total + " 分"
      })
    //     return {isSucc:0,msg:"success",total:total,scores:scoures}
      for(let i = 0; i < this.ret.group.length; i++) {
        let source = this.ret.group[i]
        this.buttons.push({
          type:"default",
          text:"第"+(i+1)+"部分：" + source + " 分"
        })
      }
    }
    this.buttons.push({
      type: 'default',
      text: '返回',
      link: '/'
    })
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
      ret:{msg:"",total:0, group:[]},
      msg:"",
      buttons: []
    }
  }
}
</script>
