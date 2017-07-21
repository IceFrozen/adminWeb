<template>
  <div style="height: 100px">
    <blur :blur-amount=10 :url="background" :height="120">
      <p class="center"><img :src="url"></p>
      <p class="center_2">{{AskInfo.name}}</p>
    </blur>
    <cell  disabled readonly  primary="content" value-align="left" style='display:block;word-break: break-all;word-wrap: break-word;'>
    {{AskInfo.desc}}
    </cell>
    <div v-for = "groupInfo in Groups">
      <!-- <p class="card-padding" style="align:center;font-size:15px;">第一部分</p> -->
       <group>
          <p class="card-padding" style="align:center;font-size:15px;">{{groupInfo.name}}</p>
       </group>
      <group   v-for ="question in groupInfo.questions" :title="question.index +'、'+ question.name" titleColor="#000" labelAlign="left" style='display:block;word-break: break-all;word-wrap: break-word;' >
        <radio 
        :selected-label-style="{color: '#FF9900'}" 
        :options="question.selects" 
        @on-change="changeRadio"></radio>
      </group> 
      <group>
          <p class="card-padding" style="align:center;font-size:15px;">得分:{{groupInfo.fen}}</p>
      </group> 
    </div>
    <div>
      <!-- <p class="card-padding" style="align:center;font-size:15px;">第一部分</p> -->
       <group>
          <p class="card-padding" style="align:center;font-size:15px;">总分:{{this.total}}</p>
       </group> 
    </div>
     <div>
       <group>
          <x-button @click.native="submitInfo" type="primary">提交</x-button>
       </group>
      <group>
          <p class="card-padding" style="align:center;font-size:15px;">总分:{{this.total}}</p>
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
import { Flexbox, FlexboxItem, Blur, Group, Cell, Card, Radio, Divider, XButton } from 'vux'
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
    XButton
  },
  async mounted () {
    let ret = await this.getQuestion()
    if(!ret) {
      this.$vux.alert.show({
        content: `问题不存在`
      })
      return this.$router.go(-1)
    }
  },
  computed: {
    ...mapState({
      AskInfo: state => state.user.Check.AskInfo,
      Groups: state => state.user.Check.Groups
    }),
    total  () {
      let total = 0
      this.Groups.map(g => {
        total += g.fen
      })
      return total
    }
  },
  filters: {},
  methods: {
    ...mapActions(['getQuestion',"complateGroupFen","submitCheck"]),
    changeRadio (a , b) {
      let aArray = a.split('_')
      let groupId = aArray[0]
      let selectId = a
      let questioId = aArray[0] +"_" +aArray[1]
      this.complateGroupFen({groupId,questioId,selectId})
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
      // images: [
      //   'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      //   'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
      //   'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
      // ],
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
</style>
