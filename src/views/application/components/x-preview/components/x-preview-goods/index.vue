<template>
  <div class="x-preview-goods" :style="{'margin-bottom': `${styles.marginBottom || 0}px`, 'background-color': styles.backgroundColor}">
    <div class="list">
      <div v-for="(product, index) in productList" :key="index" class="li">
        <x-preview-product :detail="product" />
      </div>
    </div>
  </div>
</template>

<script>
import XPreviewProduct from '../x-preview-product'

export default {
  name: 'XPreviewGoods',
  components: {
    XPreviewProduct
  },
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
    // 当前商品列表
    productList () {
      return this.detail.componentContentList[0].productList
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
  .x-preview-goods{
    .list{ padding: 0 10px; display: flex; flex-wrap: wrap;}
    .li{ width: 50%; padding: 0 3px 6px; }
  }
</style>
