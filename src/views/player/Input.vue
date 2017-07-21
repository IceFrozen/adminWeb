<template>
  <div>
    <group title="绑定微信"> 
      <cell title=""  :value="player.wxNickname" readonly >
        <img slot="icon" style="padding-right:10px;display:block;" :src="player.wxHeadimgurl" width="24" height="24">
      </cell>
      <cell title="性别"  :value="player.sex === 1?'男':'女'" readonly >
      </cell>
    </group>
    <group title="必填">
      <x-input title="姓名" v-model="name"  ref="myname" name="username" placeholder="请输入姓名" is-type="china-name" :show-clear="false" required></x-input>
      <x-input title="手机号码" v-model="phoneNumber" ref="myphone" name="mobile"  :show-clear="false" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required ></x-input>
      <datetime v-model="birthday_myStr" title="出生年月" :show-clear="false"  :min-year="1940" ref="mybirthday" required ></datetime>
      <x-address title="地址" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify" required></x-address>
    </group>
    <group title="选填">
      <x-input title="邮箱" name="email" v-model="email"  placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>
    <group title="成绩汇总">
      <cell title="医" is-link :border-intent="false" :arrow-direction="showContent_1 ? 'up' : 'down'" @click.native="showContent(1)">
       <!--  <div slot="value">
          <span style="color: green">单击查看详情</span>
        </div> -->
      </cell>
      <template v-if="showContent_1 &&　userinfo.isSetOk !==0">
       <!--  <ve-line :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></ve-line> -->
      </template>
       <template v-if="showContent_1 && userinfo.isSetOk === 0">
        <span style="color: green">请先绑定</span>
      </template>
    </group>
    <group title="">
      <x-button @click.native="submitInfo" type="primary">{{userinfo.isSetOk===0?"提交":"更新"}}</x-button>
    </group>
  </div>

</template>
<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
<script>
import { XInput, Group, XButton, Cell, Datetime, Alert, ChinaAddressData, XAddress,dateFormat } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Datetime,
    Alert,
    XAddress
  },
  data () {
    return {
      name:"",
      phoneNumber:"",
      birthday_myStr:"",
      email:"",
      chartData:{},
      chartSettings:{},
      showContent_1:true,
      addressData: ChinaAddressData,
      addressValue: []
    }
  },
  computed: {
    ...mapState({
      player: state => state.user.playerInfo,
      userinfo: state => state.user.userinfo
    })
  },
  mounted() {
    if(this.userinfo.isSetOk === 0) {
      this.showContent_1 = false
      return
    }
    this.name = this.userinfo.name
    this.phoneNumber = this.userinfo.phoneNumber
    let dateStr = dateFormat(new Date(this.userinfo.birthday), 'YYYY-MM-DD')
    this.birthday_myStr = dateStr.toString()
    this.email =this.userinfo.email||""
    this.addressValue = this.userinfo.addressValue || []
    this.$refs.mybirthday._data.currentValue = dateStr
    this.chartData = {
      columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
        { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
        { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
        { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
      ]
    }
    this.chartSettings = {
      dimension: ['日期'],
      metrics: ['销售额-1季度', '销售额-2季度', '占比'],
      axisSite: {
        right: ['占比']
      },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['销售额', '占比'],
      area: true,
      stack: {
        '销售额': ['销售额-1季度', '销售额-2季度']
      }
    }
  },
  methods: {
    ...mapActions([
      'updateUserInfo'
    ]),
    showContent (type) {
      this["showContent_" + type] = !this["showContent_" + type]
    },
    async submitInfo (val) {
      let valid1 = this.$refs.myname.valid
      let valid2 = this.$refs.myphone.valid
      let valid3 = this.$refs.mybirthday.valid
      if (!valid1) {
        this.$vux.alert.show({
          content: "请填写正确的名字"
        })
        return
      }
      if (!valid2) {
        this.$vux.alert.show({
          content: "请填写正确的手机号"
        })
        return
      }
      if (!valid3) {
        this.$vux.alert.show({
          content: "请填写正确的出生年月"
        })
        return
      }
      if(this.addressValue.length === 0) {
        this.$vux.alert.show({
          content: "请填写所在地址"
        })
        return
      }
      let birthdayNumber = new Date(this.birthday_myStr).getTime()
      if(!birthdayNumber) {
        this.$vux.alert.show({
          content: "请填写正确的出生年月"
        })
        return
      }
      await this.updateUserInfo({
        name:this.name,
        phoneNumber:this.phoneNumber,
        birthday:birthdayNumber,
        addressValue:this.addressValue,
        sex:this.player.sex,
        email:this.email
      })
    }
  }
}
</script>
