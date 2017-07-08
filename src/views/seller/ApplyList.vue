<template>
  <div>
    <form-preview v-for="item in applyList" :header-label="headerlabel" :header-value="item.cash" :body-items="item.Items"></form-preview>
  </div>
</template>
<script>
import { FormPreview,Cell } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  components : { FormPreview, Cell },
  data () {
    return {
      applyList : [],
      headerlabel:"提现金额"
    }
  },
  mounted () {
    this.getAppliCash()
  },
  computed: {
    ...mapState({
      sellerInfo : state => state.user.sellerInfo
    })
  },
  methods: {
    ...mapActions([
      'applyCash_history'
    ]),
    async getAppliCash () {
      let res = await this.applyCash_history()
      let self = this
      res.data.map(applyItem => {
        let listItem = {
          cash : "¥" + applyItem.cash,
          Items:[]
        }
        listItem.Items.push({
          label: '申请状态',
          value: transForShow(applyItem.status)
        })
        listItem.Items.push({
          label: '申请时间',
          value: dateFormat(new Date(applyItem.createTime),'yyyy-MM-dd hh:mm:ss')
        })
        if (applyItem.endTime !== 0) {
          listItem.Items.push({
            label: '审核时间',
            value: dateFormat(new Date(applyItem.endTime),'yyyy-MM-dd hh:mm:ss')
          })
        }
        if (applyItem.detail) {
          listItem.Items.push({
            label: '说明',
            value: applyItem.detail
          })
        }
        self.applyList.unshift(listItem)
      })
    }
  }
}
function transForShow (num) {
  /*
    订单状态:
    -3:提现本地错误，需要回滚，
    -2 订单异常（转账）
    -1、审核不通过,
     0、等待审核;
     2、已经到账
     1、审核通过;
  */
  switch (num) {
    case -3 :
      return "本地订单异常"
    case -2 :
      return "订单异常"
    case -1 :
      return "审核未通过"
    case 0 :
      return "等待审核"
    case 1 :
      return "已经通过"
    case 2 :
      return "已经到账"
    default :
      return '未知:' + num

  }
}
const dateFormat = function (date,fmt) {
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
