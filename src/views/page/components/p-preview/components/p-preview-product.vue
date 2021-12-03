<template>
  <div :style="styles" class="p-preview-product">
    <div :class="{ 'is-single': isSingle }" class="list">
      <div v-for="(item, index) in productList" :key="index" class="li">
        <p-product :detail="item" :single="isSingle" :sign="contentStyle.sign" :buying="contentStyle.buying" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { formatStyle } from '@/utils'
  import PProduct from './p-product.vue'

  export default defineComponent({
    name: 'PPreviewProduct',
    components: {
      PProduct
    },
    props: {
      detail: {
        type: Object,
        default: () => {}
      }
    },
    setup($props) {
      const $store = useStore()
      const $state: any = reactive({
        styles: computed(() => formatStyle($props.detail.componentStyle)),
        content: computed(() => $props.detail?.componentContentList[0] || {}),
        contentStyle: computed(() => $state.content.contentStyle || {}),
        productList: computed(() => {
          if ($state.content.productList && $state.content.productList.length) {
            return $state.content.productList
          } else {
            const productPic = 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/placeholder.png'
            return [
              {
                productName: '测试商品一',
                productPic,
                actualAmount: 10,
                saleAmount: 8
              },
              {
                productName: '测试商品二',
                productPic,
                actualAmount: 10,
                saleAmount: 8
              },
              {
                productName: '测试商品三',
                productPic,
                actualAmount: 10,
                saleAmount: 8
              },
              {
                productName: '测试商品四',
                productPic,
                actualAmount: 10,
                saleAmount: 8
              }
            ]
          }
        }),
        isSingle: computed(() => $props.detail?.templateType === 2)
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-preview-product {
    .list {
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
      .li {
        width: 50%;
        padding: 5px;
      }
      &.is-single {
        display: block;
        .li {
          width: 100%;
        }
      }
    }
  }
</style>
