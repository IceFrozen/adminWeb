<template>
  <div>
    <group label-width="4em" label-margin-right="2em" label-align="right" v-if="!sellerDetails.isFetching && sellerDetails.id">
      <cell title="系统ID" :value="sellerDetails.id"></cell>
      <cell title="微信账号">
        <div slot="value" style="float:right;">
          <x-img slot="value" :src="sellerDetails.wxInfo.wxHeadimgurl" class="wxheadimg"></x-img>
          <span>{{sellerDetails.wxInfo.wxNickname}}</span>
        </div>
      </cell>
      <cell title="剩余钻石" :value="sellerDetails.userInfo.coin"></cell>
    </group>
    <group title="给予钻石">
      <cell title="数量" primary="content">
        <range v-model="sendCoin" :min="0" :max="selfCoin"></range>
      </cell>
      <x-number v-model="sendCoin" title="数量" fillable :min="0" :max="selfCoin"></x-number>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button" @click.native="showCoinConfirm">给予钻石</x-button>
    </box>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Group, Cell, Range, XNumber, XButton, Box, XImg } from 'vux'
export default {
  components : { Group, Cell, Range, XNumber, XButton, Box, XImg },
  data () {
    return {
      sendCoin : 0
    }
  },
  mounted () {
    this.getSellerDetails(this.$route.params.id)
  },
  computed: {
    ...mapState({
      sellerDetails : state => state.user.sellerDetails,
      selfCoin : state => state.user.coin
    })
  },
  methods: {
    ...mapActions([
      "getSellerDetails",
      "transferCoinToSeller"
    ]),
    showCoinConfirm () {
      if (this.sendCoin <= 0) {
        this.$vux.toast.show({text:"数量错误",type:"cancel"})
        return
      }
      this.$vux.confirm.show({
        title: "确认",
        content: `你确认要发送${this.sendCoin}个钻石给推广员${this.sellerDetails.wxInfo.wxNickname}吗？操作不可撤销.`,
        onConfirm: () => {
          this.transferCoinToSeller(this.sendCoin).then(() => this.$vux.toast.show({text:"发送成功!"}))
          this.sendCoin = 0
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.wxheadimg {
  width: 30px;
  height: auto;
}
</style>
