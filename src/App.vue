<template>
  <div style="">
    <router-view class="router-view" style=""></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.router-view {
  width: 100%;
}
</style>
