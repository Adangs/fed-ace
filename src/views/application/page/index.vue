<template>
  <div class="m-application">
    <x-aside />
    <div class="preview" @click="onBlur">
      <x-preview />
    </div>
    <x-panel />
  </div>
</template>

<script>
import * as XPage from '../components'

export default {
  name: 'Application',
  components: {
    ...XPage
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    this.resetPageData()
  },
  methods: {
    resetPageData () {
      this.$store.dispatch('application/ResetPageData')
    },
    // 取消当前选中模块
    onBlur () {
      this.$store.dispatch('application/SetCurrent', null)
    }
  }
}
</script>

<style lang="less">
  .m-application{
    height: 100%; overflow: hidden; display: flex;
    .preview{
      flex: 1; padding: 60px 0; overflow: auto;
    }
  }
</style>
