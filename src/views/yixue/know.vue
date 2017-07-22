<template>
  <div style="height: 100px">
    <blur :blur-amount=10 :url="background" :height="120">
      <p class="center"><img :src="url"></p>
      <p class="center_2">自我觉察</p>
    </blur>
    <cell  disabled readonly  primary="content" value-align="left" style='display:block;word-break: break-all;word-wrap: break-word;'>
    </cell>
    <div>
      <group>
        <p class="card-padding" style="align:center;font-size:15px;">第一部分:五禽戏五个动作，哪个动作身体感觉最强烈？</p>
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
        <p class="card-padding" style="align:center;font-size:15px;">第二部分:六字诀音声训练，哪个与你更同频？</p>
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
        <p class="card-padding" style="align:center;font-size:15px;">第三部分:通过妙心圣手中医工作坊第一天对自己的身心觉察，请回答：*</p>
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
import _ from 'lodash'
import { Blur, Group, Cell, Radio, XButton, CheckIcon, XTextarea } from 'vux'
export default {
  components: {
    Blur,
    Cell,
    Group,
    Radio,
    XButton,
    CheckIcon,
    XTextarea
  },
  async mounted () {
    await this.getCheckInfo('know')
    let self = this
    this.know.lession1.map(k => {
      let select = _.find(self.lession1,{name:k})
      if(select) {
        select.isSelect = true
      }
    })
    this.know.lession2.map(k => {
      let select = _.find(self.lession1,{name:k})
      if(select) {
        select.isSelect = true
      }
    })
  },
  computed: {
    ...mapState({
      know: state => state.user.Mark.know
    })
  },
  filters: {},
  methods: {
    ...mapActions(["getCheckInfo","subMission"]),
    changeRadio (item,key) {
      let keyName = 'lession'+ key
      for(let i = 0; i < this[keyName].length; i++) {
        let l = this[keyName][i]
        if(l.name === item.name) {
          l.isSelect = true
        }else{
          l.isSelect = false
        }
      }
    },
    async submitInfo () {
      // 查看信息
      let input = {
        type:"know",
        lession1 : [],
        lession2 : [],
        lession3 : []
      }
      for(let i =0; i < this.lession1.length; i++) {
        if(this.lession1[i].isSelect === true) {
          input.lession1.push(this.lession1[i].name)
        }
      }
      for(let i =0; i < this.lession2.length; i++) {
        if(this.lession2[i].isSelect === true) {
          input.lession2.push(this.lession2[i].name)
        }
      }
      if(input.lession1.length === 0 || input.lession2.length === 0) {
        return
      }
      let tmp = []
      this.askInput.map(a => {
        if(a.value) {
          tmp.push(a)
        }
      })
      input.askInput = tmp
      let ret = await this.subMission(input)
      this.$router.push({name: 'AlertCheck', params: {ret}})
    }
  },
  data () {
    return {
      // images: [
      //   'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      //   'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
      //   'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
      // ],
      lession1: [
        {image:"lu.jpg", name:"1_lu", desc:"", isSelect:false},
        {image:"hou.jpg", name:"1_hou", desc:"", isSelect:false},
        {image:"xiong.jpg", name:"1_xiong", desc:"", isSelect:false},
        {image:"niao.jpg", name:"1_niao", desc:"", isSelect:false},
        {image:"hu.jpg", name:"1_hu", desc:"", isSelect:false}
      ],
      lession2: [
        {image:"xu.png", name:"2_he", desc:"", isSelect:false},
        {image:"he.png", name:"2_he", desc:"", isSelect:false},
        {image:"hu.png", name:"2_hu", desc:"", isSelect:false},
        {image:"xi.png", name:"2_xi", desc:"", isSelect:false},
        {image:"chui.png", name:"2_chui", desc:"", isSelect:false},
        {image:"xixi.png", name:"2_xixi", desc:"", isSelect:false}
      ],
      lession3: [],
      askInput:[
        {key:"4_1", question:"（1）总结近期一个月的身心状态", value:""},
        {key:"4_2", question:"（2）本次工作坊重点关注和解决的问题", value:""}
      ],
      url: 'static/images/logo.jpg',
      background: 'static/images/bg.jpg'
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
.myicon {
 // border-radius: 60%;
}
</style>
