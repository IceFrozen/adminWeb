<template>
  <h1>请使用微信打开链接 {{tmp}}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
  	return {
  		tmp:1
  	}
  },
  created () {
  	// TODO 这里做登录操作
  	console.log(this.$store.state)
  },
  mount () {
  },
  computed: {
    ...mapState({
    })
  },
  filters: {},
  methods: {
    // ...mapActions()
  }
}
</script>

<style lang="less">
</style>
