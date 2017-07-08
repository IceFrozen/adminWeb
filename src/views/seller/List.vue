<template>
  <div>
    <Panel header="我名下的推广员" :list="sellers" type="3"></panel>
  </div>
</template>

<script>
import _ from 'lodash'
import { Panel } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Panel
  },
  computed: {
    ...mapState({
      "list": state => state.user.sellerList.items
    }),
    sellers () {
      return _.compact(this.list.map((seller) => {
        if(seller.id === this.$store.state.user.id)return null
        return {
          title:seller.wxInfo.wxNickname,
          src:seller.wxInfo.wxHeadimgurl,
          url:"/home/seller/details/"+seller.id
        }
      }))
    }
  }
}
</script>

<style lang="less">
</style>
