<template>
  <div :style="styles" class="p-preview-text">
    <div :class="{ 'is-inline': isInline }" :style="contentStyles" class="content">
      <div v-if="content.title" :style="titleStyles" class="title">{{ content.title }}</div>
      <div v-if="content.remark" :style="descStyles" class="desc">{{ content.remark }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { formatStyle } from '@/utils'

  export default defineComponent({
    name: 'PPreviewText',
    components: {},
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
      const $state: any = reactive({
        styles: computed(() => formatStyle($props.detail.componentStyle)),
        isInline: computed(() => $props.detail?.templateType === 12),
        content: computed(() => $props.detail?.componentContentList[0] || {}),
        contentStyle: computed(() => $state.content.contentStyle),
        contentStyles: computed(() =>
          formatStyle({
            textAlign: $state.contentStyle.textAlign
          })
        ),
        // 标题样式转换
        titleStyles: computed(() =>
          formatStyle({
            color: $state.contentStyle.titleColor,
            fontSize: $props.rem ? `${$state.contentStyle.titleFontSize / 75}rem` : $state.contentStyle.titleFontSize,
            fontWeight: $state.contentStyle.titleFontWeight
          })
        ),
        // 描述样式转换
        descStyles: computed(() =>
          formatStyle({
            color: $state.contentStyle.descColor,
            fontSize: $props.rem ? `${$state.contentStyle.descFontSize / 75}rem` : $state.contentStyle.descFontSize,
            fontWeight: $state.contentStyle.descFontWeight
          })
        )
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-preview-text {
    .content {
      padding: 5px;
      line-height: 1.4;
      min-height: 30px;
      &.is-inline {
        .title {
          display: inline-block;
        }
        .desc {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }
</style>
