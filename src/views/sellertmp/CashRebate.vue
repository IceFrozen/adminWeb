<template>
  <div>
    <group label-width="4em" label-heigt="14em" label-margin-right="2em" label-align="right">
      <cell title="剩余"  text-align="center" >
       {{sellerInfo.rebate}}
      </cell>
    
    </group>
    <group>
       <!--  <x-input title="￥" v-model="applyRebate" type='number' text-align="center" placeholder="请输入要提现的金额"></x-input> -->
    </group>
    <box gap="10px 10px">
       <x-button type="primary" action-type="button" @click.native="showCoinConfirm">申请提现</x-button>
    </box>
     <box gap="10px 10px">
      <x-button type="primary" action-type="button"  @click.native="showList">查看进度</x-button>
    </box>
    <box gap="10px 10px">
      <divider>返现细节</divider>
    </box>
    <x-table full-bordered>
      <thead>
        <tr>
          <th>玩家</th>
          <th>充值额</th>
          <th>推广员</th>
          <th>充值时间</th>
          <th>返现额</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rebateItem in sellerInfo.rebates">
          <td>
            <div style="display: inline-block;" align = "center">
              <img v-if="rebateItem.order.playerInfo" :src="rebateItem.order.playerInfo.wxHeadimgurl" style="width: 30px; border-radius:50px;display: block;"/>
                <span style="font-size:8px;">{{rebateItem.order.playerInfo?rebateItem.order.playerInfo.wxNickname:"error"}}</span>
            </div>
          </td>
          <td>{{rebateItem.order.amount}}</td>
          <td>
            <div style="display: inline-block;" align = "center">
              <img v-if="rebateItem.order.playerInfo" :src="rebateItem.order.playerInfo.seller?rebateItem.order.playerInfo.seller.wxInfo.wxHeadimgurl:null" style="width: 30px; border-radius:50px;display: block;"/>
              <span style="font-size:8px;" v-if="rebateItem.order.playerInfo" >
              {{rebateItem.order.playerInfo.seller?rebateItem.order.playerInfo.seller.wxInfo.wxNickname:''}}
              </span>
            </div>
          <td><span style="font-size:8px">{{rebateItem.order.payTime | DateFormat}}</span></td>
          <td>{{rebateItem.cash}}</td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Group, Cell, Range, XNumber, XButton, Box, XImg, XInput, Panel, Grid, XTable, Divider } from 'vux'
export default {
  components : { Group, Cell, Range, XNumber, XButton, Box, XImg, Panel, XInput, Grid, XTable, Divider },
  data () {
    return {
      // applyRebate : 0,
      applyListPath: '/home/seller/ApplyList'
    }
  },
  mounted () {
    // this.applyRebate = 0
    this.getSellerInfo()
  },
  computed: {
    ...mapState({
      sellerInfo : state => state.user.sellerInfo
    })
  },
  filters:{
    DateFormat:function (time) {
      return dateFormat(new Date(time),'yy-MM-dd hh:mm')
    }
  },
  methods: {
    ...mapActions([
      'getSellerInfo',
      'applyCash'
    ]),
    async onScrollBottom (args) {
      this.$nextTick(() => {
        // this.$refs.scrollerBottom.reset()
      })
    },
    async showCoinConfirm () {
      // if (this.applyRebate < 0) {
      //   this.$vux.toast.show({text:"错误",type:"cancel"})
      //   return
      // }
      if (this.sellerInfo.rebate <= 0) {
        this.$vux.toast.show({text:"余额不足",type:"cancel"})
        return
      }
      // this.applyRebate = parseFloat(parseFloat(this.applyRebate).toFixed(2))
      this.$vux.confirm.show({
        title: "确认",
        content: `你确认要申请提现 ￥ ${this.sellerInfo.rebate}吗？`,
        onConfirm: () => {
          this.applyCash()
          .then(res => {
            if(res.data.isSucc === 0) {
              this.$vux.toast.show({text:"申请成功",type:"info"})
              // this.applyRebate = 0
            } else {
              this.$vux.toast.show({text:res.data.msg,type:"cancel"})
              // this.applyRebate = 0
            }
          })
          .then(this.getSellerInfo)
        }
      })
    },
    showList () {
      this.$router.push('/home/seller/ApplyList')
    }
  }
}
const dateFormat = function (date, fmt) {
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  }
  return fmt
}
</script>

<style lang="less" scoped>
.wxheadimg {
  width: 30px;
  height: auto;
}
</style>
