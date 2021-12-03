<template>
  <div :style="styles" class="p-preview-banner">
    <n-carousel :style="{ height: height }" show-arrow>
      <template v-if="componentContentList && componentContentList.length">
        <div v-for="item in componentContentList" :key="item.imgUrl || item.id" class="item">
          <img :src="formatCdn(item.imgUrl)" />
        </div>
      </template>
      <div v-else class="item">
        <img :src="formatCdn(defaultBanner)" />
      </div>
    </n-carousel>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NCarousel } from 'naive-ui'
  import defaultBanner from '@/assets/images/banner-default.png'
  import { formatStyle, formatCdn } from '@/utils'

  export default defineComponent({
    name: 'PPreviewBanner',
    components: {
      NCarousel
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
      const $state = reactive({
        defaultBanner,
        componentContentList: computed(() => $props.detail?.componentContentList || []),
        styles: computed(() => formatStyle($props.detail.componentStyle)),
        height: computed(() => {
          let height = 380
          switch ($props.detail?.templateType) {
            case 1:
              height = 380
              break
            case 6:
              height = 290
              break
            case 7:
              height = 750
              break
            case 9:
              height = 320
              break
            case 16:
              height = 1046
              break
            default:
              break
          }

          // 单位转为rem, 预览时使用
          if ($props.rem) {
            return `${height / 75}rem`
          } else {
            return `${height / 2}px`
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
  .p-preview-banner {
    .item {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
