<template>
  <div :style="styles" :class="{ 'is-fixed': isFixed }" class="p-preview-service">
    <div class="pic">
      <img :src="content.imgUrl" />
    </div>
    <dl>
      <dt v-if="content.title" :style="titleStyles">{{ content.title }}</dt>
      <dd v-if="content.remark" :style="descStyles">{{ content.remark }}</dd>
    </dl>
    <div v-if="content.buttonDesc" :style="buttonStyles" class="button">
      {{ content.buttonDesc }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { formatStyle } from '@/utils'

  export default defineComponent({
    name: 'PPreviewService',
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
        isFixed: computed(() => $props.detail?.templateType === 15),
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
        ),
        // 按钮样式转换
        buttonStyles: computed(() =>
          formatStyle({
            color: $state.contentStyle.buttonColor,
            backgroundColor: $state.contentStyle.buttonBackgroundColor,
            fontSize: $props.rem ? `${$state.contentStyle.buttonFontSize / 75}rem` : $state.contentStyle.buttonFontSize,
            fontWeight: $state.contentStyle.buttonFontWeight
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
  .p-preview-service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    word-break: break-all;
    &.is-fixed {
      padding: 0;
      margin: 0 !important;
      border-radius: 50%;
      .pic {
        margin: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px -2px 2px rgba(186, 186, 186, 0.2), 0px 3px 3px rgba(217, 217, 217, 0.2);
      }
      dl,
      .button {
        display: none;
      }
    }
    .pic {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 3px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    dl {
      flex: 1;
    }
    .button {
      padding: 2px 8px;
      border-radius: 2px;
    }
  }
</style>
