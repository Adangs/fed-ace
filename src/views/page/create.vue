<template>
  <x-layout-main container-style="height: 100%;padding: 0;display: flex;">
    <p-preview />
    <p-panel />
    <template #footer>
      <n-space justify="center">
        <x-button :disabled="loading" @click="handleSend(0, true)">预览</x-button>
        <x-button :disabled="loading" type="primary" @click="handleSend(1)">发布</x-button>
      </n-space>
    </template>
  </x-layout-main>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NSpace, useMessage } from 'naive-ui'
  import { XLayoutMain, XButton } from '@/components'
  import { useStore } from '@/store'
  import { useRoute, useRouter } from 'vue-router'
  import PPreview from './components/p-preview/index.vue'
  import PPanel from './components/p-panel/index.vue'
  import { useDictionary } from '@/hooks'
  import { replacer } from '@/utils'

  export default defineComponent({
    name: 'PageCreate',
    components: {
      NSpace,
      XLayoutMain,
      XButton,
      PPreview,
      PPanel
    },
    setup() {
      const $message = useMessage()
      const $dictionary = useDictionary()
      $dictionary.get(['PAGE_LINK_TYPE'])
      const $route = useRoute()
      const $router = useRouter()
      const $store = useStore()
      const { query } = $route
      const $state: any = reactive({
        query,
        loading: false,
        detail: null,
        page: computed(() => $store.state.pages.page),
        showDraft: computed(() => !($state.detail?.putStatus === 1 && $route.name !== 'PageCopy'))
      })

      // 格式化数据与校验
      const handleRequestData = (pageType: number) => {
        // 页面类型：0-草稿箱；1-微页面
        return new Promise((resolve, reject) => {
          // 使用replacer处理空数据字段
          const params = JSON.parse(JSON.stringify($state.page, replacer))
          // 校验页面标题
          if (!params.title) {
            $store.dispatch('pages/setCurrent', null)
            $message.warning('请填写页面标题')
            return reject('请填写页面标题')
          }
          // 页面样式数据格式化
          params.pageStyle = typeof params.pageStyle === 'object' ? JSON.stringify(params.pageStyle) : params.pageStyle
          // 页面模块
          const componentLists = params.componentList
          const len = componentLists.length
          if (!len) {
            $message.warning('请添加页面模块数据')
            return reject('请添加页面模块数据')
          }
          for (let i = 0; i < len; i++) {
            const componentList = componentLists[i]

            // 这里需要用this.page的数据，因为存在引用关系
            const setCurrentComponentList = $state.page.componentList[i]
            // 非草稿箱是需要进行内容校验
            if (pageType) {
              switch (componentList.type) {
                case 1:
                  if (componentList.componentContentList.length < 1) {
                    $store.dispatch('pages/setCurrent', setCurrentComponentList)
                    $message.warning('请添加Banner图片')
                    return reject('请添加Banner图片')
                  }
                  break
                case 4:
                  if (componentList.componentContentList.length < 1) {
                    $store.dispatch('pages/setCurrent', setCurrentComponentList)
                    $message.warning('请添加分类导航')
                    return reject('请添加分类导航')
                  }
                  break
                case 6:
                  if (!componentList.componentContentList[0].productId) {
                    $store.dispatch('pages/setCurrent', setCurrentComponentList)
                    $message.warning('请添加商品/推广页')
                    return reject('请添加商品/推广页')
                  }
                  break
                case 8:
                  if (!componentList.componentContentList[0].title && !componentList.componentContentList[0].remark) {
                    $store.dispatch('pages/setCurrent', setCurrentComponentList)
                    $message.warning('标题和描述不能同时为空')
                    return reject('标题和描述不能同时为空')
                  }
                  break
              }
            }
            // 模块样式转换成字符串json
            componentList.componentStyle =
              typeof componentList.componentStyle === 'object'
                ? JSON.stringify(componentList.componentStyle)
                : componentList.componentStyle

            // 删除id，初始化时，id是前端生成的；编辑保存的时候，后端不处理此id
            delete componentList.id

            // 模块内子模块样式转换成字符串json
            componentList.componentContentList.forEach((content: any) => {
              delete content.id
              if (Object.prototype.toString.call(content.productId) === '[object Array]') {
                // 落地id串，转换为用,号分隔
                content.productId = content.productId.join(',')
                delete content.productList
              }

              content.contentStyle =
                typeof content.contentStyle === 'object' ? JSON.stringify(content.contentStyle) : content.contentStyle
            })
          }

          resolve(params)
        })
      }

      // 发布
      const handleSend = (pageType: number) => {
        handleRequestData(pageType).then((payload: any) => {
          localStorage.setItem('page-data', JSON.stringify(payload))
          $message.success('保存成功')
          $router.push({
            name: 'PagePreview'
          })
        })
      }

      return {
        ...toRefs($state),
        handleSend
      }
    }
  })
</script>

<style></style>
