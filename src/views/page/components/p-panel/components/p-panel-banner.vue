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
        <div class="dt">Banner样式</div>
        <div class="dd">最多添加5个广告，鼠标拖转调整广告顺序，建议尺寸{{ currentTemplateType.size }}像素</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList" handle=".is-move" group="panel" item-key="id">
            <template #item="{ element }">
              <p-panel-item :detail="element" :is-remove="current.componentContentList.length > 1" />
            </template>
          </vue-draggable>
          <div v-if="componentContentList.length < 5" class="tools-add">
            <x-upload @success="handleUploadSuccess">
              <x-button type="primary" block>添加Banner</x-button>
            </x-upload>
          </div>
        </div>
      </div>
      <p-panel-config :detail="componentStyle" title="主体样式" class="group" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import VueDraggable from 'vuedraggable'
  import { v4 as uuidv4 } from 'uuid'
  import { NRadioGroup, NRadioButton, NTooltip } from 'naive-ui'
  import { XIcon, XButton, XUpload } from '@/components'
  import { useStore } from '@/store'
  import { useRoute, useRouter } from 'vue-router'
  import PPanelConfig from './p-panel-config.vue'
  import PPanelItem from './p-panel-item.vue'

  export default defineComponent({
    name: 'PPanelBanner',
    components: {
      VueDraggable,
      NRadioGroup,
      NRadioButton,
      NTooltip,
      XButton,
      XIcon,
      XUpload,
      PPanelConfig,
      PPanelItem
    },
    setup() {
      const $router = useRouter()
      const $route = useRoute()
      const $store = useStore()
      const $state: any = reactive({
        current: computed(() => $store.state.pages.current),
        componentStyle: computed(() => $state.current?.componentStyle),
        currentTemplateType: computed(() =>
          $state.templateTypeList.find((item: any) => item.value === $state.current.templateType)
        ),
        componentContentList: computed(() => $state.current?.componentContentList || []),
        templateTypeList: [
          {
            label: '小图轮播',
            icon: 'icon-031',
            value: 1,
            size: '750x380'
          },
          {
            label: '大图轮播',
            icon: 'icon-032',
            value: 7,
            size: '750x750'
          },
          // {
          //   label: '小图背景模糊',
          //   icon: 'icon-033',
          //   value: 9,
          //   size: '710x320'
          // },
          {
            label: '全屏轮播',
            icon: 'icon-034',
            value: 16,
            size: '710x1046'
          }
        ]
      })

      // 图片上传成功
      const handleUploadSuccess = (res: any) => {
        $state.current.componentContentList.push({
          id: uuidv4(),
          title: null,
          imgUrl: res.fileUrl,
          linkType: 2,
          productId: null,
          productInfo: null
        })
      }

      return {
        ...toRefs($state),
        handleUploadSuccess
      }
    }
  })
</script>

<style lang="scss"></style>
