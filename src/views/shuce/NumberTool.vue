<template>
     <div style="margin: 0px;height: inherit;background: url(static/images/bgshuce.jpg);">
    <!--  <grid style="">
      <grid-item link="/component/cell" style="border-bottom: 0px ">
        <img slot="icon" src="../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="">
         
      </grid-item>
      <grid-item link="/component/cell">
      </grid-item>
    </grid> -->
      <!--  <x-button type="default" plain @click.native="showPlugin">选择生日</x-button> -->
   <flexbox style="">
      <flexbox-item ><div class="flex-demo" style="margin-top:50px"></div></flexbox-item>
    </flexbox>
    <div class="flex-demo"  style="margin-left:50px;margin-right:50px"> <x-button type="default" plain @click.native="showPlugin" style=" background: #ffffff;opacity:0.5;">{{datatime==''?'选择生日':datatime}}</x-button> </div>
  <div style="top:10">
    <grid >
      <grid-item  style="border-bottom: 0px ">
      </grid-item>
      <grid-item label="">
          <img src="/static/images/logo.png" style="heigth:100%;width:100%;border-bottom: 0px">
      </grid-item>
      <grid-item >
      </grid-item>
    </grid>
    <grid>
        <div style="display: table-cell; width: 100%;vertical-align: middle;text-align: center;heigth:100%"> 
          <img src="/static/images/result.png" width="50%" alt="dasdfasdfg"> 
          <div style="position:absolute;z-indent:2;left:50%;top:15px;"> {{first}}</div>
        </div> 
    </grid>
    <grid>
      <grid-item  style="border-bottom: 0px ">
       <!--  <img slot="icon" src="../assets/grid_icon.png"> -->
      </grid-item>
      <grid-item  label="">
          <img src="/static/images/shuce.png" style="heigth:100%;width:100%;border-bottom: 0px" @click="doAtction(false)">
      </grid-item>
      <grid-item >
      </grid-item>
    </grid>
    <grid>
        <div style="display: table-cell;position: relative; width: 100%;vertical-align: middle;text-align: center;heigth:100%"> 
          <img src="/static/images/result.png" width="50%" alt="dasdfasdfg"> 
          <div style="position:absolute;z-indent:2;left:50%;top:15px;"> {{second}}</div>
        </div> 
    </grid>
    <grid>
      <grid-item  style="border-bottom: 0px ">
       <!--  <img slot="icon" src="../assets/grid_icon.png"> -->
      </grid-item>
      <grid-item  label="" >
          <img src="/static/images/bggua.png" style="heigth:100%;width:100%;border-bottom: 0px" @click="doAtction(true)">
      </grid-item>
      <grid-item >
      </grid-item>
    </grid>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { Datetime, Group, XButton, Grid, GridItem, XImg, Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    Datetime,
    Group,
    XButton,
    Grid,
    GridItem,
    XImg,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      datatime:"",
      first:"",
      second:""
    }
  },
  methods: {
    showPlugin () {
      let self = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY年MM月DD日',
        value: '2017-05-20',
        minYear:1930,
        maxYear:2030,
        onConfirm (val) {
          self.datatime = val
          self.first = ''
          self.second = ''
        },
        onShow () {},
        onHide () {}
      })
    },
    validateNumber (dateString) {
      if(!_.isString(dateString)) {
        return {code:-1,msg:"dateString is not string"}
      }
      if(dateString.length === 0) {
        return {code:-1,msg:"waitting for input data"}
      }
      for(let i =0; i < dateString.length; i++) {
        let item = dateString[i]
        if(!_.isNumber(parseInt(item))) {
          return {code:-1,msg:"error parse number index:" +i +",dateString is " + dateString}
        }
      }
      return {code:0,msg:"success"}
    },
    compulute (arrs, recursion) {
      if(!recursion) {
        let c = (arrs.reduce((a,b) => a+b))
        return c % 8 === 0?8:(c % 8)
      }
      let midRet = arrs.reduce((a,b) => a+b)
      let arr = _.toArray(midRet.toString()).map(_.toNumber)
      if(arr.length > 1) {
        return this.compulute(arr,true)
      }
      return arr[0] >= 9?arr[0] - 8 :arr[0]
    },
    actionMethod (dateTime,recursion) {
      let validateRet = this.validateNumber(dateTime)
      if(validateRet.code !== 0) {
        this.showMessage(validateRet.msg)
        return -1
      }
      let dataItems = _.toArray(dateTime).map(_.toNumber)
      return this.compulute(dataItems,recursion)
    },
    doAtction (recursion) {
      let dateString = this.converToNumber(this.datatime)
      if(!dateString) {
        return this.showMessage("请输入生日")
      }
      let retNumber = this.actionMethod(dateString,recursion)
      if(recursion) {
        this.second = retNumber
      }else {
        this.first = retNumber
      }
    },
    showMessage (message) {
      this.$vux.alert.show({
        title: '',
        content: message,
        onShow () {},
        onHide () {}
      })
    },
    converToNumber (stringDate) {
      return stringDate.replace(/[^0-9]/ig,"")
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
  .weui-grid:after{
    border-bottom: 0px;
    border-top: 0px;
    border-right: 0px solid #D9D9D9;
  }
  .weui-grids:before {
    border-top: 0px;
  }
  .weui-grid:before {
    border-top: 0px;
    border-right: 0px solid #D9D9D9;
  }
</style>
