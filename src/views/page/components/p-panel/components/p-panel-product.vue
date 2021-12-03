<template>
  <div v-if="current" class="p-panel-template">
    <div class="h1">{{ current.vue_name }}</div>
    <div class="p-body">
      <div class="group template">
        <div class="dt">选择模板</div>
        <div class="radio">
          <n-radio-group v-model:value="current.templateType">
            <n-radio-button v-for="(item, index) in templateTypeList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <x-icon :name="item.icon" :size="28" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </div>
      </div>
      <div class="group">
        <div class="dt">商品/推广页</div>
        <div class="content">
          <vue-draggable
            v-if="formData.productList?.length"
            v-model="formData.productList"
            group="panel"
            item-key="productId"
            class="product-list"
          >
            <template #item="{ element }">
              <div class="product">
                <img :src="formatCdn(element.productPic)" />
                <n-tooltip placement="left">
                  <template #trigger>
                    <div class="remove">
                      <x-icon name="icon-036" @click.stop="handleRemoveProduct(element)" />
                    </div>
                  </template>
                  点击删除
                </n-tooltip>
              </div>
            </template>
          </vue-draggable>
          <div class="tools-add">
            <x-button type="primary" block @click="handleSelectProduct">添加</x-button>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="dt">展示样式</div>
        <n-descriptions :column="1" bordered>
          <n-descriptions-item content-style="padding: 0">
            <template #label>
              <div style="display: flex; align-items: center">
                <span style="flex: 1">购买按钮</span>
                <n-switch v-model:value="contentStyle.buying.enable" />
              </div>
            </template>
            <div v-if="contentStyle.buying.enable" style="padding: 5px">
              <n-radio-group v-model:value="contentStyle.buying.value">
                <n-space>
                  <n-radio v-for="item in buyingStyleOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </div>
          </n-descriptions-item>
          <n-descriptions-item content-style="padding: 0">
            <template #label>
              <div style="display: flex; align-items: center">
                <span style="flex: 1">商品角标</span>
                <n-switch v-model:value="contentStyle.sign.enable" />
              </div>
            </template>
            <div v-if="contentStyle.sign.enable" style="padding: 5px">
              <n-radio-group v-model:value="contentStyle.sign.value">
                <n-space>
                  <n-radio v-for="item in signStyleOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </div>
          </n-descriptions-item>
        </n-descriptions>
      </div>
      <p-panel-config :detail="componentStyle" title="主体样式" class="group" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import VueDraggable from 'vuedraggable'
  import {
    NDescriptions,
    NDescriptionsItem,
    NRadioGroup,
    NRadioButton,
    NRadio,
    NTooltip,
    NSpace,
    NSwitch
  } from 'naive-ui'
  import { XIcon, XButton } from '@/components'
  import { useStore } from '@/store'
  import { formatCdn } from '@/utils'
  import PPanelConfig from './p-panel-config.vue'

  export default defineComponent({
    name: 'PPanelProduct',
    components: {
      VueDraggable,
      NRadioGroup,
      NRadioButton,
      NRadio,
      NTooltip,
      NSwitch,
      NSpace,
      NDescriptions,
      NDescriptionsItem,
      XButton,
      XIcon,
      PPanelConfig
    },
    setup() {
      const $store = useStore()
      const $state: any = reactive({
        drawerVisible: false,
        current: computed(() => $store.state.pages.current),
        componentStyle: computed(() => $state.current?.componentStyle),
        formData: computed(() => $state.current?.componentContentList[0]),
        contentStyle: computed(() => $state.current?.componentContentList[0].contentStyle),
        templateTypeList: [
          {
            label: '双排',
            icon: 'icon-044',
            value: 3
          },
          {
            label: '单排',
            icon: 'icon-045',
            value: 2
          }
        ],
        buyingStyleOptions: [
          {
            label: '样式一',
            value: 1
          },
          {
            label: '样式二',
            value: 2
          },
          {
            label: '样式三',
            value: 3
          },
          {
            label: '样式四',
            value: 4
          },
          {
            label: '样式五',
            value: 5
          },
          {
            label: '样式六',
            value: 6
          },
          {
            label: '样式七',
            value: 7
          },
          {
            label: '样式八',
            value: 8
          }
        ],
        signStyleOptions: [
          {
            label: '样式一',
            value: 'https://alicdn.madaomall.com/test/feima-uploaded/images/1b/d5/1bd5c6c474245b707e4bfe9c920145b9.png'
          },
          {
            label: '样式二',
            value: 'https://alicdn.madaomall.com/test/feima-uploaded/images/ee/1a/ee1a0ffcef52ac1a4b1324266a0d5d49.png'
          },
          {
            label: '样式三',
            value: 'https://alicdn.madaomall.com/test/feima-uploaded/images/fa/e3/fae39a36658730c26a5a300375cc7a8e.png'
          },
          {
            label: '样式四',
            value: 'https://alicdn.madaomall.com/test/feima-uploaded/images/3f/f0/3ff091bff1eaa34b41ef7e0c2f0b8294.png'
          }
        ]
      })

      // 选择商品
      const handleSelectProduct = () => {
        $state.drawerVisible = true
      }

      // 移除商品
      const handleRemoveProduct = (row: { productId: string | number }) => {
        const productList = $state.formData.productList
        const findIndex = productList.findIndex((item: { id: string | number }) => item.id === row.productId)
        $state.formData.productList.splice(findIndex, 1)
        $state.formData.productId = $state.formData.productId.filter((item: string | number) => item !== row.productId)
      }

      // 确定选中的商品
      const handleSubmitLanding = () => {
        // 通过id再去获取商品详细数据
        $store
          .dispatch('store-manage/getPagesProductsInfo', {
            productIds: $state.formData.productId
          })
          .then((res) => {
            $state.formData.productList = res.data
          })
      }

      return {
        ...toRefs($state),
        handleSelectProduct,
        handleRemoveProduct,
        handleSubmitLanding,
        formatCdn
      }
    }
  })
</script>

<style lang="scss" scoped>
  .product-list {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    padding-bottom: 10px;
    .product {
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 1px solid #fff;
        border-radius: 4px;
      }
      &:hover {
        .remove {
          display: flex;
        }
      }
      .remove {
        position: absolute;
        display: none;
        right: 5px;
        top: 5px;
        border-radius: 50%;
        padding: 3px;
        color: #fff;
        width: 20px;
        height: 20px;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        .x-icon {
          font-size: 12px;
        }
      }
    }
  }
</style>
