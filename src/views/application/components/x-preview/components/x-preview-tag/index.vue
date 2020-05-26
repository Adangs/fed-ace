<template>
  <div class="m-preview-tag" :style="{'margin-bottom': `${styles.marginBottom || 0}px`}">
    <div class="li" v-for="(item, index) in detail.componentContentList" :key="index">
      <div class="inline-block">
        <div class="item">
          <div class="icon">
            <el-image :src="item.imgUrl" />
          </div>
          <div class="name">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'XPreviewTag',
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

<style lang="less">
  .m-preview-tag{
    display: flex; align-items: center; background-color: #F2F2F2; color: #FF0000; height: 32px;
    .li{ flex: 1; text-align: center; line-height: 1;}
    .inline-block{ display: inline-block;}
    .item{ display: flex; align-items: center;}
    .icon{
      width: 16px; height: 16px;
      .el-image{ vertical-align: initial;}
    }
    .name{ padding-left: 5px; font-size: 12px;}
  }
</style>
