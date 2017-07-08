<template>
  <div>
     <panel  type="3" header="我名下的玩家"></panel>
     <div v-for="player in players">
      <cell :title="player.title" :value="player.orderCount" is-link :link="player.url">
        <img slot="icon" width="30" style="display:block;margin-right:8px;" :src="player.src">
      </cell>
    </div>
  </div>
</template>
<script>
import { Panel, Group, Search,Scroller, Cell } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  components: { Panel, Group, Search, Scroller, Cell },
  methods: {
    ...mapActions([
      "getPlayerList"
    ])
  },
  computed: {
    ...mapState({
      list: state => state.user.playerList.items
    }),
    players () {
      return this.list.map((player) => {
        let title = player.wxNickname
        if(player.id === this.$store.state.user.id) {
          title += " (自己)"
        }
        let count = 0
        if(player.orders) {
          player.orders.map(o => {
            if(o.status === 1) {
              count += o.amount
            }
          })
        }
        return {
          title:title,
          src:player.wxHeadimgurl,
          url:"/home/player/details/"+player.id,
          orderCount:"¥"+count
        }
      })
    }
  }
}

</script>
<style lang="less">
</style>
