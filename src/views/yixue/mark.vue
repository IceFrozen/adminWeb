<template>
  <div style="height: 100px">
    <blur :blur-amount=10 :url="url" :height="120">
      <p class="center"><img :src="url"></p>
      <p class="center_2">功课打卡</p>
    </blur>
    <cell  disabled readonly  primary="content" value-align="left" style='display:block;word-break: break-all;word-wrap: break-word;'>
        "我是说明"
    </cell>
    <div v-for = "time in 1">
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">第一部分:五禽戏</p>
      </group>
      <group class="" v-for="item in lession1" style="padding: 10px;" >
        <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px" v-on:click="changeRadio(item,1)">
          <p style="text-align:center;">
            <img :src="`static/images/${item.image}`" class="vux-radio-icon myicon" > 
          </p>
          <p style="text-align:center;margin-top:10px">
            <check-icon :value="item.isSelect"></check-icon> 
          </p>
        </div>
      </group>  
    </div>
    <div>
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">第二部分:六字诀</p>
      </group>
      <group class="" v-for="item in lession2" style="padding: 10px;">
        <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px" v-on:click="changeRadio(item,2)">
          <p style="text-align:center;">
            <img :src="`static/images/${item.image}`" class="vux-radio-icon" > 
          </p>
          <p style="text-align:center;margin-top:10px">
            <check-icon :value="item.isSelect"></check-icon> 
          </p>
        </div>
      </group>   
    </div>
    <div>
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">第三部分:能量自查</p>
      </group>
      <group style="padding: 10px;">
        <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px" >
          <!-- <p style="text-align:center;">
            <img :src="`static/images/${item.image}`" class="vux-radio-icon" > 
          </p> -->
          <p style="text-align:left;margin-top:5px" v-for="item in lession3" v-on:click="changeRadio(item,3)">
            <check-icon :value="item.isSelect">{{item.name}}</check-icon> 
          </p> 
        </div>
      </group>   
    </div>
    <div>
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">第四部分:你的自查</p>
      </group>
      <group class="" style="padding: 10px;"  v-for="askitem in askInput " :title="askitem.question">
        <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px">
          <x-textarea v-model="askitem.value"></x-textarea>
        </div>
      </group>     
      <!-- <group class="" style="padding: 10px;" title="（1）总结近期一个月的身心状态 ">
        <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px">
          <div style="text-align:center;border:1px solid rgba(247, 53, 50, 0.3);padding:20px">
            <x-textarea ></x-textarea>
        </div>
        </div>
      </group> -->   
    </div>
    <div>
      <group>
        <x-button @click.native="submitInfo" type="primary">提交</x-button>
       </group>
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">总分</p>
       </group> 
    </div>
    <!--  <card  stype="font-size: 18px;">
     <div slot="header" class="card-padding" style="padding: 5px;">第一部分</div>
      <div slot="content" class="card-padding" style="padding: 0px; margin-top:0px">
        <div>
           <checklist title="我是问题提干啊" :options="objectList"  type="radio" :max="1" v-model="objectListValue" :check-disabled="false" :required="true" @on-change="change"></checklist>
        </div>
        <div>
          <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
          <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies  efficitur vitae non felis. Phasellus quis nibh hendrerit..</p> 
        </div>
      </div> 
      <div slot="footer" class="card-padding" style="padding: 5px;">
       结束 统计得分
      </div>
    </card> -->
    <!-- <flexbox :gutter="0">
      <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
    </flexbox> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import _ from 'lodash'
import { Flexbox, FlexboxItem, Blur, Group, Cell, Card, Radio, Divider, XButton, CheckIcon, XTextarea } from 'vux'
export default {
  components: {
    Blur,
    Flexbox,
    FlexboxItem,
    Cell,
    Card,
    Group,
    Radio,
    Divider,
    XButton,
    CheckIcon,
    XTextarea
  },
  async mounted () {
    // await this.getQuestion()
  },
  computed: {
    ...mapState({
      AskInfo: state => state.user.Check.AskInfo,
      Groups: state => state.user.Check.Groups
    })
  },
  filters: {},
  methods: {
    ...mapActions(['getQuestion',"complateGroupFen","submitCheck"]),
    changeRadio (item,key) {
      let keyName = 'lession'+ key
      for(let i = 0; i < this[keyName].length; i++) {
        let l = this[keyName][i]
        if(l.name === item.name) {
          l.isSelect = !l.isSelect
          return
        }
      }
    },
    async submitInfo () {
      // 提交信息
      // 判断有没有填入的
      for(let i =0; i < this.Groups.length; i++) {
        let group = this.Groups[i]
        for(let j = 0; j < group.questions.length; j++) {
          let q = group.questions[j]
          if(!q.select) {
            return this.$vux.alert.show({
              content: `第${group.index}组的第${q.index}题没有填写`
            })
          }
        }
      }
      // 提交表单
      let ret = await this.submitCheck()
      this.$router.push({name: 'AlertCheck', params: {ret}})
    }
  },
  data () {
    return {
      images: [
        'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
        'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
      ],
      // lession: [ "lu","hu","xiong","hou","niao" ],
      lession1: [
        {image:"hu.jpg", name:"hu", desc:"", isSelect:false},
        {image:"lu.jpg", name:"lu", desc:"", isSelect:false},
        {image:"hou.jpg", name:"hou", desc:"", isSelect:false},
        {image:"xiong.jpg", name:"xiong", desc:"", isSelect:false},
        {image:"niao.jpg", name:"niao", desc:"", isSelect:false}
      ],
      lession2: [
        {image:"xi.png", name:"xi", desc:"", isSelect:false},
        {image:"hu.png", name:"hu", desc:"", isSelect:false},
        {image:"xixi.png", name:"xixi", desc:"", isSelect:false},
        {image:"chui.png", name:"chui", desc:"", isSelect:false},
        {image:"he.png", name:"he", desc:"", isSelect:false}
      ],
      lession3: [
        {image:"", name:"肝脏能量提升：敲打胆经", desc:"", isSelect:false},
        {image:"", name:"心脏能量提升：拍打心经", desc:"", isSelect:false},
        {image:"", name:"脾脏能量提升：五行针灸足三里穴", desc:"", isSelect:false},
        {image:"", name:"肺脏能量提升：按摩猎取穴", desc:"", isSelect:false},
        {image:"", name:"肾脏能量提升：五行经络刷刷肾经", desc:"", isSelect:false}
      ],
      askInput:[
          {question:"（1）一个月后自查得分及排序", value:""},
          {question:"（2）一个月后你的身心变化", value:""}
      ],
      demo1: true,
      demo5:"1",
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      objectList: [{key: '1', value: '分数'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
      objectListValue:null
    }
  }
}
</script>
<style scoped>
.center {
  text-align: center;
/*  padding-top:10px;*/
  color: #fff;
  font-size: 18px;
}
.center_2 {
  text-align: center;
  margin-top:0px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 50px;
  height: 50px;
  margin-top: 0px;
  border: 2px solid #ececec;
}
.vux-radio-icon {
    width: 80%;
    height: 80%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.weui-cell__ft {
  display: none;
}
</style>
