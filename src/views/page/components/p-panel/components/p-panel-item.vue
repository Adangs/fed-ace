<template>
  <div class="p-panel-item">
    <n-space v-if="showTools" justify="end" class="header">
      <n-tooltip v-if="isRemove" placement="left">
        <template #trigger>
          <x-icon name="icon-036" @click="handleRemove" />
        </template>
        点击删除
      </n-tooltip>
      <n-tooltip v-if="isMove" placement="left">
        <template #trigger>
          <x-icon name="icon-039 is-move" />
        </template>
        拖动模块进行排序
      </n-tooltip>
    </n-space>
    <div class="body">
      <div class="pic">
        <x-upload @success="handleUploadSuccess">
          <img :src="formatCdn(detail.imgUrl)" />
          <div class="tips">更换图片</div>
        </x-upload>
      </div>
      <div class="form">
        <x-form ref="formRef" v-model:model="formData" label-placement="left" size="small">
          <n-form-item label="标题" path="title">
            <n-input v-model:value="formData.title" clearable placeholder="请输入内容" />
          </n-form-item>
          <n-form-item label="类型" path="linkType">
            <n-select
              v-model:value="formData.linkType"
              :options="dictionary['PAGE_LINK_TYPE']"
              placeholder="请选择落地类型"
              @update:value="handleLandingRemove"
            />
          </n-form-item>
          <n-form-item label="落地" path="productId">
            <n-tag v-if="formData.productId" type="info" closable @close="handleLandingRemove">
              <n-ellipsis style="max-width: 149px">
                {{ productInfo }}
              </n-ellipsis>
            </n-tag>
            <x-button @click="drawerVisible = true">选择{{ linkTypeName }}</x-button>
          </n-form-item>
        </x-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NTooltip, NSpace, NInput, NSelect, NFormItem, NTag, NEllipsis } from 'naive-ui'
  import { XIcon, XForm, XUpload, XButton } from '@/components'
  import { useStore } from '@/store'
  import { useDictionary } from '@/hooks'
  import { formatCdn } from '@/utils'

  export default defineComponent({
    name: 'PPanelItem',
    components: {
      NSpace,
      NTooltip,
      NInput,
      NSelect,
      NFormItem,
      NTag,
      NEllipsis,
      XIcon,
      XForm,
      XUpload,
      XButton
    },
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      isRemove: {
        type: Boolean,
        default: false
      },
      isMove: {
        type: Boolean,
        default: true
      }
    },
    emits: ['select'],
    setup($props, { emit: $emit }) {
      const $dictionary = useDictionary()
      const $store = useStore()
      const $state: any = reactive({
        ...toRefs($props),
        drawerVisible: false,
        current: computed(() => $store.state.pages.current),
        formData: $props.detail,
        showTools: computed(() => {
          return $props.isRemove || $props.isMove
        }),
        // 落地类型名称
        linkTypeName: computed(() => $dictionary.find($state.formData.linkType, 'PAGE_LINK_TYPE')),
        // 字典
        dictionary: computed(() => $store.getters.dictionary),
        landingTabs: computed(() => {
          return $state.formData.linkType === 1 ? ['pages'] : ['product', 'advertising']
        }),
        productInfo: computed(() => {
          const product = $state.formData.productList || []
          const productInfo = []
          if (product[0]) {
            switch (product[0].productType) {
              case 0:
                productInfo.push('商品')
                break
              case 1:
                productInfo.push('投放页')
                break
              default:
                productInfo.push('微页面')
                break
            }
            productInfo.push(product[0].productName)
          }
          return productInfo.join(' | ')
        })
      })

      // 替换图片上传成功
      const handleUploadSuccess = (res: { fileUrl: string }) => {
        $state.formData.imgUrl = res.fileUrl
      }

      // 删除单个
      const handleRemove = () => {
        const componentContentList = $state.current.componentContentList
        const findIndex = componentContentList.findIndex(
          (item: { id: string | number }) => item.id === $props.detail.id
        )
        $state.current.componentContentList.splice(findIndex, 1)
      }

      // 删除选中的落地
      const handleLandingRemove = () => {
        $state.formData.productId = null
        $state.formData.productList = []
      }

      // 选择落地数据
      const handleLandingChange = (id: string | number, item: any, currentTab: string) => {
        let productInfo
        switch (currentTab) {
          case 'advertising':
            productInfo = {
              productType: 1,
              productName: item.pageName
            }
            break
          case 'product':
            productInfo = {
              productType: 0,
              productName: item.productTitle
            }
            break
          default:
            productInfo = {
              productType: 2,
              productName: item.title
            }
            break
        }
        $state.formData.productList = [productInfo]
      }

      return {
        ...toRefs($state),
        handleUploadSuccess,
        handleRemove,
        handleLandingRemove,
        handleLandingChange,
        formatCdn
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-panel-item {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    .header {
      color: #acb9cc;
      padding-bottom: 10px;
      .x-icon {
        cursor: pointer;
      }
      .is-move {
        cursor: move;
      }
    }
    .body {
      display: flex;
      align-content: center;
      .pic {
        width: 90px;
        height: 90px;
        background-color: #fff;
        display: flex;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        margin-right: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tips {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          color: #fff;
          padding: 3px 5px;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.5);
          font-size: 12px;
        }
      }
      .form {
        flex: 1;
      }
    }
  }
</style>
