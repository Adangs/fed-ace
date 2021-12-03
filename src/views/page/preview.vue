<template>
  <div class="m-page-preview">
    <p-preview readonly />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { aside } from './components/config'
  import PPreview from './components/p-preview/index.vue'

  export default defineComponent({
    name: 'PagePreview',
    components: {
      PPreview
    },
    setup() {
      const $store = useStore()
      const $state = reactive({
        loading: false,
        page: computed(() => $store.state.pages.page)
      })

      // 编辑状态下获取详情
      const res = localStorage.getItem('page-data')
      if (res) {
        const data = JSON.parse(res)
        $state.page.title = data.title
        $state.page.pageStyle = JSON.parse(data.pageStyle)
        $state.page.componentList = data.componentList.map((item: any) => {
          // 基础组件
          const baseComponent = aside.find((s) => s.type === 'base')
          const find = baseComponent.list.find((s) => s.type === item.type)
          for (const key in find) {
            if (/^vue_/gi.test(key)) {
              item[key] = find[key]
            }
          }
          // 格式化样式数据
          item.componentStyle =
            typeof item.componentStyle === 'string' ? JSON.parse(item.componentStyle) : item.componentStyle
          if (item.componentContentList[0]) {
            item.componentContentList.forEach((content: any) => {
              if (content.contentStyle) {
                content.contentStyle =
                  typeof content.contentStyle === 'string' ? JSON.parse(content.contentStyle) : content.contentStyle
              }
            })
          }
          return item
        })
      }

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .m-page-preview {
    .qrcode {
      position: fixed;
      width: 200px;
      height: 200px;
      background-color: #fff;
      right: 30px;
      bottom: 30px;
      padding: 10px;
      img {
        width: 100%;
      }
    }
  }
</style>
