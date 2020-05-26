<template>
  <div class="x-panel-config">
    <div v-if="styles.marginBottom !== undefined" class="_container">
      <div class="_label">底部间距</div>
      <div class="_value">
        <el-slider v-model="styles.marginBottom" :max="20"></el-slider>
      </div>
    </div>
    <div v-if="styles.backgroundColor" class="_container">
      <div class="_label">背景色</div>
      <div class="_value">{{ styles.backgroundColor }}</div>
      <div class="_tools">
        <el-color-picker v-model="styles.backgroundColor" />
      </div>
    </div>
    <div v-if="styles.textColor" class="_container">
      <div class="_label">文字色</div>
      <div class="_value">{{ styles.textColor }}</div>
      <div class="_tools">
        <el-color-picker v-model="styles.textColor" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'XPanelConfig',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      current: state => state.application.current || {}
    }),
    styles () {
      return this.current ? this.current.componentStyle : {}
    }
  },
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="less">

</style>
