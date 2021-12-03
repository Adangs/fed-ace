<template>
  <div :style="styles" class="p-preview-nav">
    <n-grid :cols="detail.listType">
      <n-gi v-for="item in componentContentList" :key="item.id">
        <n-space vertical style="text-align: center">
          <img :key="item.imgUrl" :src="formatCdn(item.imgUrl)" :style="{ width: width, height: width }" />
          <n-ellipsis :style="{ 'max-width': width, 'font-size': '12px' }">
            {{ item.title }}
          </n-ellipsis>
        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NGrid, NGi, NSpace, NEllipsis } from 'naive-ui'
  import { useStore } from '@/store'
  import { formatStyle, formatCdn } from '@/utils'
  import { v4 as uuidv4 } from 'uuid'

  export default defineComponent({
    name: 'PPreviewNav',
    components: {
      NGrid,
      NGi,
      NSpace,
      NEllipsis
    },
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      rem: {
        type: Boolean,
        default: false
      }
    },
    setup($props) {
      const $store = useStore()
      const $state = reactive({
        componentContentList: computed(() => {
          const componentContentList = $props.detail?.componentContentList || []
          if (componentContentList.length) {
            return componentContentList
          } else {
            const list = []
            for (let i = 0; i < $props.detail.listType; i++) {
              list.push({
                id: uuidv4(),
                title: `标题${i + 1}`,
                imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/placeholder.png',
                linkType: 2,
                productId: null
              })
            }
            return list
          }
        }),
        styles: computed(() => formatStyle($props.detail.componentStyle)),
        width: computed(() => {
          let width = 100
          switch ($props.detail.listType) {
            case 1:
              width = 694
              break
            case 2:
              width = 340
              break
            case 3:
              width = 210
              break
            case 4:
              width = 150
              break
            case 5:
              width = 100
              break
            default:
              break
          }

          // 单位转为rem, 预览时使用
          if ($props.rem) {
            return `${width / 75}rem`
          } else {
            return `${width / 2}px`
          }
        })
      })

      return {
        ...toRefs($state),
        formatCdn
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-preview-nav {
    padding: 12px 15px;
    img {
      object-fit: cover;
      border-radius: 50%;
    }
  }
</style>
