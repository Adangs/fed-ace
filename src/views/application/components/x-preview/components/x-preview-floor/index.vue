<template>
  <div class="m-preview-floor" :class="{'is-floor': detail.templateType === 5}" :style="{'margin-bottom': `${styles.marginBottom || 0}px`, 'background-color': styles.backgroundColor}">
    <div class="tabs">
      <ul :class="{'is-flex': isFlex}">
        <li v-for="(item, index) in tabs" :key="index" :class="{'is-active': index === current}">
          <div class="item">
            <div class="title" :style="{'color': index === current ? styles.textColor : ''}">
              <i v-if="detail.templateType === 5 && index === current" class="x-icon icon-032" />
              {{ item.title }}
            </div>
            <div v-if="detail.templateType === 4" class="sub" :style="{'background-color': index === current ? styles.textColor : ''}">{{ item.subTitle }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!--副标题-->
    <template v-if="detail.templateType === 4">
      <div class="content">
        <div class="list">
          <div v-for="(product, i) in productList" :key="i" class="li">
            <x-preview-product :detail="product" />
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="detail.templateType === 5">
      <div v-for="(item, index) in detail.componentContentList" :key="index" class="content">
        <div class="title" :style="{'color': styles.textColor}">
          <i class="x-icon icon-036" />
          {{ item.title }}
          <i class="x-icon icon-037" />
        </div>
        <div class="list">
          <div v-for="(product, i) in item.productList" :key="i" class="li">
            <x-preview-product :detail="product" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XPreviewProduct from '../x-preview-product'

export default {
  name: 'XPreviewFloor',
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
    return {
      current: 0
    }
  },
  computed: {
    ...mapState({
      // 缩放比
      ratio: state => state.application.page.ratio || 2
    }),
    tabs () {
      return this.detail.componentContentList
    },
    isFlex () {
      return this.tabs.length <= 4
    },
    // 当前商品列表
    productList () {
      return this.detail.componentContentList[this.current].productList
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
  .m-preview-floor{
    &.is-floor{
      .tabs{ padding: 15px 0;}
    }
    .tabs{
      padding: 12px 0; background-color: #f8f8f8;
      .is-flex{
        overflow: hidden;
        li{ flex: 1; padding: 0;}
      }
      ul{ display: flex; align-items: center; overflow: auto;}
      li{
        text-align: center; flex-shrink: 0; padding: 0 18px;
        .title{ font-size: 15px; font-weight: bold; color: #333;}
        .sub{ font-size: 12px; color: #A4A4A4; display: inline-block; padding: 3px 10px; border-radius: 20px; line-height: 1;}
        &.is-active{
          .title{ color: #FD3D37;}
          .sub{ background-color: #FD3D37; color: #fff;}
        }
      }
    }
    .content{
      > .title{
        text-align: center; font-size: 20px; font-weight: bold; padding: 20px 0;
      }
      .list{ padding: 0 10px; display: flex; flex-wrap: wrap;}
      .li{ width: 50%; padding: 0 3px 6px; }
    }
  }
</style>
