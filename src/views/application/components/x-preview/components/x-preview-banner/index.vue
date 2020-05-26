<template>
  <div class="m-preview-banner" :style="{'margin-bottom': `${styles.marginBottom || 0}px`}">
    <template v-if="detail.templateType === 1">
      <el-carousel :height="height">
        <el-carousel-item v-for="(item, index) in detail.componentContentList" :key="index">
          <el-image :src="item.imgUrl" />
        </el-carousel-item>
      </el-carousel>
    </template>
    <template v-else-if="detail.templateType === 2">
      <div v-for="(item, index) in detail.componentContentList" :key="index" class="li">
        <el-image :src="item.imgUrl" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'XPreviewBanner',
  components: {},
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      // 缩放比
      ratio: state => state.application.page.ratio || 2
    }),
    height () {
      return `${this.detail.componentContentList[0].height / this.ratio}px`
    },
    // 模块样式
    styles () {
      return this.detail.componentStyle || {}
    }
  },
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style>

</style>
