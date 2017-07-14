<template>
  <div class="">
    <swiper :list="swiperImgs" :auto="true" :loop="true"></swiper>
     <card :header="{title:'我的服务'}" style="margin-top: 0px;">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <flexbox :gutter="0">
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="admin" style="color: #000000"><i class="fa fa-file-text fa-5x"></i></router-link>
              <br>
            <span :style="{fontSize: '12px' }">中医坊</span> 
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="admin" style="color: #000000"><i class="fa fa-check-square-o fa-5x"></i></router-link>
              <br>
            <span :style="{fontSize: '12px' }">中医坊</span> 
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="admin" style="color: #000000"><i class="fa fa-bar-chart fa-5x"></i></router-link>
              <br>
            <span :style="{fontSize: '12px' }">中医坊</span> 
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
    <group title="关注微信公众号" align="center">
      <div style="text-align:center;margin-top:15px;">
        <img style="width:160px;height:160px;" id="demo_img" :src="imgData"/>
      </div>
    </group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Group, Cell, Swiper, Qrcode, Divider, Card, Flexbox, FlexboxItem, Icon } from 'vux'

export default {
  components: { Group, Cell, Swiper, Qrcode, Divider, Card, Flexbox, FlexboxItem, Icon },
  data () {
    return {
      playerLink: '',
      sellerLink: '',
      rebateDetailPath:'/home/seller/CashRebate',
      swiperImgs:[
        {
          url:'javascript:',
          img:require("../../assets/640-300-1.jpg"),
          title:"月入百万不是梦"
        },
        {
          url:'javascript:',
          img:require("../../assets/640-300-2.jpg"),
          title:"新人提携计划"
        },
        {
          url:'javascript:',
          img:require("../../assets/640-300-3.jpg"),
          title:"老人进阶计划"
        }
      ],
      imgData:require("../../assets/qrbg.png"),
      height: window.innerHeight - 46 - 53
    }
  },
  mounted () {},
  computed: {
    ...mapState({})
  },
  filters: {},
  methods: {
    ...mapActions({})
  }
}
</script>

<style lang="less">
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  background-color: #fff;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.cbox-inner {
  padding: 23px 0;
  width: 100%;
  height: 100%;
}
</style>
