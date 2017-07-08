<template>
  <h1>请使用微信打开链接</h1>
</template>

<script>
export default {
  mount () {
    if (this.$device.isWechat) {
      return this.$route.push('/loginWX')
    }
  }
}
</script>

<style lang="less">
</style>
