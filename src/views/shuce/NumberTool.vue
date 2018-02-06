<template>
  <div>
     <div style="margin: 0px;height: inherit;background: url(static/images/bgshuce.jpg);">
    {{ datatime }}
      <x-button type="primary" plain @click.native="showPlugin">选择生日</x-button>
    </div>
  </div>
</template>
<script>
import { Datetime, Group, XButton } from 'vux'
export default {
  components: {
    Datetime,
    Group,
    XButton
  },
  data () {
    return {
      datatime:"19700820"
    }
  },
  methods: {
    showPlugin () {
      let self = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: '2017-05-20',
        onConfirm (val) {
          self.datatime = val
        },
        onShow () {},
        onHide () {}
      })
    }
  }
}
</script>

<style scoped lang="less">
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
