<template>
  <div class="">
    <group title="生成钻石">
      <cell title="数量" primary="content">
        <range v-model="coinNum" :min="0" :max="10000"></range>
      </cell>
      <x-number v-model="coinNum" title="数量" fillable :min="0" :max="10000"></x-number>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button" @click.native="doGenerateCoin">生成钻石</x-button>
    </box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {Group, Cell, XButton, Box, Range, XNumber} from 'vux'
export default {
  components: {Group, Cell, XButton, Box, Range, XNumber},
  data () {
    return {
      coinNum:0
    }
  },
  mounted () {

  },
  methods:{
    ...mapActions(['generateCoin']),
    doGenerateCoin () {
      if(this.coinNum <= 0) {
        this.$vux.toast.show({text:"数量错误",type:"cancel"})
        return
      }
      this.generateCoin(this.coinNum).then(() => this.$vux.toast.show({text:"生成成功!"}))
      this.coinNum = 0
    }
  }
}
</script>

<style lang="less">
</style>
