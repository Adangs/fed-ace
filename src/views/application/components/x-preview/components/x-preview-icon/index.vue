<template>
  <div class="m-preview-icon" :style="{'margin-bottom': `${styles.marginBottom || 0}px`}">
    <div class="content" :class="iconClass">
      <div v-for="(item, index) in detail.componentContentList" :key="index" class="li">
        <div class="item">
          <div class="pic">
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
  name: 'XPreviewIcon',
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
    iconClass () {
      const len = this.detail.componentContentList.length
      if (len <= 4) {
        return 'span-1'
      } else {
        const ceil = Math.ceil(len / 2)
        return `span-${ceil}`
      }
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

<style lang="less">
  .m-preview-icon{
    padding: 0 10px;
    .content{
      background-color: #fff; border-radius: 5px; display: flex; align-items: center; flex-wrap: wrap;
      &.span-1{
        .li{ flex: 1;}
      }
      &.span-3{
        .li{ width: 33.3333%;}
      }
      &.span-4{
        .li{ width: 25%;}
      }
      &.span-5{
        .li{ width: 20%;}
      }
      .li{
        text-align: center; padding: 12px;
        .pic{ width: 50px; height: 50px; display: inline-block;}
        .name{ font-size: 12px; color: #333; padding-top: 5px;}
      }
    }
  }
</style>
