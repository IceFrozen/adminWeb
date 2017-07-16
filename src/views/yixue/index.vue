<template>
  <div class="">
    <swiper :list="swiperImgs" :auto="true" :loop="true"></swiper>
     <card :header="{title:'我的服务'}" style="margin-top: 0px;">
      <div slot="content" class="card-demo-flex card-demo-content01" style="background-color:#f3f3f3">
        <flexbox :gutter="0" >
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="checkMyself" style="color: #000000"><img class="icon" src="static/images/check.jpg"></img></router-link>
              <br>
            <span :style="{fontSize: '12px' }">体质自查</span> 
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="knowMyself" style="color: #000000"><img class="icon" src="static/images/up.jpg"></img></router-link>
              <br>
            <span :style="{fontSize: '12px' }">自我觉察</span> 
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
            <div class="vux-1px-r cbox-inner">
              <router-link to="admin" style="color: #000000"><img class="icon" src="static/images/know.jpg"></img></router-link>
              <br>
            <span :style="{fontSize: '12px' }">自我提升</span> 
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
    <group title="关注微信公众号" align="center">
      <div style="text-align:center;margin-top:15px;">
        <img style="width:80%;height:80%;" id="demo_img" :src="imgData"/>
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
      url:"static/images/check.jpg",
      swiperImgs:[
        {
          url:'javascript:',
          // img:require("../../assets/yixue.png"),
          img:'static/images/yixuetop.png',
          title:"妙心圣手"
        }
      ],
      imgData:'static/images/ecoode.jpg',
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
.icon {
  // width: 50px;
  height: 50px;
  margin-top: 0px;
  border: 2px solid #ececec;
}
</style>
