<template>
  <div class="">
    <swiper :list="swiperImgs" :auto="true" :loop="true"></swiper>
     <card :header="{title:'我的功能'}" style="margin-top: 0px;">
      <div slot="content" class="card-demo-flex card-demo-content01" >
        <flexbox :gutter="0">
        <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active" >
          <div class="vux-1px-r cbox-inner">
          <!--  style="background-color:#f3f3f3" -->
           <!--  <icon type="success" style="width:50%; height:50%; border-radius:50%; overflow:hidden;"></icon> -->
             <!--  <img src="./qrbg.png" style="width:30%;border-radius:50%; overflow:hidden;"> -->
             <router-link to="/shuce/NumberTool" style="color: #000000"><i class="fa fa-heartbeat fa-5x"></i></router-link>
            <br>
            <span :style="{fontSize: '12px' }">数测工具</span> 
          </div>
        </flexbox-item>
        <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
          <div class="vux-1px-r cbox-inner" >
            <!--  <router-link to="home/yixue" style="color: #000000"></router-link> -->
             <i class="fa fa-volume-up fa-5x"></i>
            <br>
            <span :style="{fontSize: '12px' }">暂未开发</span>
          </div>
        </flexbox-item> 
        <flexbox-item :span="1/3" class="cbox vux-1px-t vux-tap-active">
          <div class="vux-1px-r cbox-inner" >
            <!--  <router-link to="home/yixue" style="color: #000000"></router-link> -->
             <i class="fa fa-volume-up fa-5x"></i>
            <br>
            <span :style="{fontSize: '12px' }">暂未开发</span>
          </div>
        </flexbox-item>
        <!--   <flexbox-item :span="1/3"  key="aaaa" class="cbox vux-1px-t vux-tap-active">
          <div class="vux-1px-r cbox-inner">
              <img src="./qrbg.png" style="width:30%;border-radius:50%; overflow:hidden;">
             <i class="fa fa-camera-retro fa-4x"></i>
            <br>
            <span :style="{fontSize: '12px' }">我是字体哇</span>
          </div>
        </flexbox-item> -->
      </flexbox>
      </div>
    </card>
 
   <!--  <group title="个人信息">
      <cell title="我的钻石" :value="$store.state.user.coin"></cell>
      <cell title="我的返点" v-if="!$store.state.user.sellerInfo.isFetching&&
          $store.state.user.sellerInfo.id"
          :link="{path:rebateDetailPath}"
          :value="$store.state.user.sellerInfo.rebate">
      </cell>
        <cell title="推广等级" v-if="!$store.state.user.sellerInfo.isFetching&&
          $store.state.user.sellerInfo.id"
          :value="$store.state.user.sellerInfo.level">
      </cell>
    </group>-->
  <!--   <group title="推广链接（点击进入后，点右上角，“分享给微信好友”）">
      <cell title="我的子代理邀请链接" inline-desc="用此邀请链接的`新`用户，将成为您的子代理" is-link @click.native="shareLink('seller',links.sellers[0].id)"></cell>
      <cell title="游戏下载地址" inline-desc='用此下载地址`首次`下载游戏的玩家，充值会给您返点' is-link @click.native="shareLink('player',links.players[0].id)"></cell>
    </group>  -->
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
// import QRCodeImpl from 'qr.js/lib/QRCode'
// import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
// import Promise from 'bluebird'
// const appConfig = require('../../appConfig')
function camelCase (input) {
  let str = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })
  str = str.replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase()
  })
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
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
          img:"static/images/5.jpg",
          title:"易道洗心"
        },
        {
          url:'javascript:',
          img:"static/images/2.jpg",
          title:"中医养心"
        },
        {
          url:'javascript:',
          img:"static/images/1.jpg",
          title:"儒家正心"
        },
        {
          url:'javascript:',
          img:"static/images/4.jpg",
          title:"道家静心"
        },
        {
          url:'javascript:',
          img:"static/images/3.jpg",
          title:"禅宗明心"
        }
      ],
      imgData:"static/images/ecoode.jpg",
      height: window.innerHeight - 46 - 53
    }
  },
  mounted () {
    // if(this.$store.state.user.userinfo.isSetOk === 0) {
    //   this.$vux.alert.show({
    //     title:"请完善个人信息"
    //   })
    //   return this.$router.push("/home/player/details")
    // }
    // console.log(this.$store.state)
    // var linkId = this.links.sellers[0].id
    // linkId = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    // var link,title,desc,imgUrl
    // title = "地地道道的任丘麻将，快来玩吧！"
    // desc = `原汁原味的任丘本地麻将，快来跟 < ${this.$store.state.user.playerInfo.wxNickname} > 一起玩吧`
    // let link = "http://192.168.2.102"
    // imgUrl = 'http://wx.mahjong.haowan98.com/static/icon_1024.png'
    // var config = {
    //   title,
    //   link,
    //   desc,
    //   imgUrl,
    //   complete: () => {
    //     this.$vux.alert.hide()
    //   },
    //   fail:(err) => {
    //     alert(err)
    //   }
    // }
    // this.$wechat.onMenuShareAppMessage(config)
    /*
    this.$wechat.onMenuShareTimeline(config)
    /*
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel['H'])
    qrcode.addData(link)
    qrcode.make()
    Promise.all([
      loadImage(require("./qrbg.png")),
      loadImage(this.$store.state.user.playerInfo.wxHeadimgurl,true)
    ]).then((imgs) => {
      // [bgimg,iconimg]
      const bgimg = imgs[0]
      const iconimg = imgs[1]
      const canvas = document.createElement("canvas")
      canvas.height = canvas.width = 640
      const ctx = canvas.getContext('2d')
      ctx.drawImage(bgimg,0,0,640,640)
      const cells = qrcode.modules
      const tileW = 250 / cells.length
      const tileH = 250 / cells.length
      const x = 350
      const y = 250
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(345 , 245 , 260, 310)
      ctx.fillStyle = "#000000"
      ctx.font='40px bold Helvetica'
      ctx.textAlign="center"
      ctx.fillText(this.$store.state.user.playerInfo.wxNickname,480,540)
      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          ctx.fillStyle = cell ? "#000000" :"#FFFFFF"
          const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          ctx.fillRect(Math.round(cdx * tileW) + x, Math.round(rdx * tileH) + y, w, h)
        })
      })
      ctx.drawImage(iconimg,350+125 - tileW * 5,250+125 - tileW * 5,tileW * 10,tileW * 10)
      this.imgData = canvas.toDataURL('image/png')
    })
    .catch(e => {
      console.error(e)
    })
    */
  },
  computed: {
    ...mapState({
      // links: state => state.user.linkList
    })
  },
  filters: {
    camelCase
  },
  methods: {
    ...mapActions({
      // getLinkList: 'getLinkList'
    }),
    shareLink(type,linkId) {
      // var link,title,desc,imgUrl
      // if(type === 'player') {
      //   title = "地地道道的任丘麻将，快来玩吧！"
      //   desc = `原汁原味的任丘本地麻将，快来跟 < ${this.$store.state.user.playerInfo.wxNickname} > 一起玩吧`
      //   link = `http://wx.mahjong.haowan98.com/static/invitePlayer.html?t=${linkId}`
      // }
      // else{
      //   title = "推广麻将，在家赚钱！"
      //   desc = `只需要一部手机就能在家兼职赚钱!快来跟 < ${this.$store.state.user.playerInfo.wxNickname} > 一起赚吧`
      //   link = `http://wx.mahjong.haowan98.com/static/inviteSeller.html?t=${linkId}`
      // }
      // imgUrl = 'http://wx.mahjong.haowan98.com/static/icon_1024.png'
      // var config = {
      //   title,
      //   link,
      //   desc,
      //   imgUrl,
      //   complete: () => {
      //     this.$vux.alert.hide()
      //   },
      //   fail:(err) => {
      //     alert(err)
      //   }
      // }
      // // alert(JSON.stringify(config))
      // this.$wechat.onMenuShareAppMessage(config)
      // this.$wechat.onMenuShareTimeline(config)
      // this.$vux.alert.show({
      //   title:"点击右上角，分享给好友"
      // })
    }
  }
}

// function loadImage(src,byproxy) {
//   return new Promise(function(resolve,reject) {
//     var img=new Image()
//     img.onload = () => resolve(img)
//     img.onerror = (err) => reject(err)
//     if(byproxy) {
//       src = src.replace("http://wx.qlogo.cn/","/api/wxHeadimg/")
//     }
//     img.src = src
//   })
// }
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
  // color: #f74c31;
}
.cbox-inner {
  padding: 23px 0;
  width: 100%;
  height: 100%;
}
</style>
