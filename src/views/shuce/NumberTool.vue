<template>
     <div style="margin: 0px;height: inherit;background: url(static/images/bgshuce.jpg);">
     <grid style="">
      <grid-item link="/component/cell" style="border-bottom: 0px ">
       <!--  <img slot="icon" src="../assets/grid_icon.png"> -->
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="">
            <x-button type="default" plain @click.native="showPlugin">选择生日</x-button>
      </grid-item>
      <grid-item link="/component/cell">
      </grid-item>
    </grid>
  <div style="top:10;background-color:aquamarine">
  asdfasdf
    <grid >
      <grid-item link="/component/cell" style="border-bottom: 0px ">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="">
          <img src="/static/images/logo.png" style="heigth:100%;width:100%;border-bottom: 0px">
      </grid-item>
      <grid-item link="/component/cell">
      </grid-item>
    </grid>
    <grid>
        <div style="display: table-cell; width: 100%;vertical-align: middle;text-align: center;heigth:100%"> 
          <img src="/static/images/result.png" width="50%" alt="dasdfasdfg"> 
          <div style="position:absolute;z-indent:2;left:35%;top:15px;"> 数字为</div>
        </div> 
    </grid>
    <grid>
      <grid-item link="/component/cell" style="border-bottom: 0px ">
       <!--  <img slot="icon" src="../assets/grid_icon.png"> -->
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="">
          <img src="/static/images/shuce.png" style="heigth:100%;width:100%;border-bottom: 0px">
      </grid-item>
      <grid-item link="/component/cell">
      </grid-item>
    </grid>
    <grid>
        <div style="display: table-cell;position: relative; width: 100%;vertical-align: middle;text-align: center;heigth:100%"> 
          <img src="/static/images/result.png" width="50%" alt="dasdfasdfg"> 
          <div style="position:absolute;z-indent:2;left:35%;top:15px;"> 数字为</div>
        </div> 
    </grid>
    <grid>
      <grid-item link="/component/cell" style="border-bottom: 0px ">
       <!--  <img slot="icon" src="../assets/grid_icon.png"> -->
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="">
          <img src="/static/images/bggua.png" style="heigth:100%;width:100%;border-bottom: 0px">
      </grid-item>
      <grid-item link="/component/cell">
      </grid-item>
    </grid>
    </div>
  </div>
</template>
<script>
import { Datetime, Group, XButton, Grid, GridItem, XImg } from 'vux'
export default {
  components: {
    Datetime,
    Group,
    XButton,
    Grid,
    GridItem,
    XImg
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
