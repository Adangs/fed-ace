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
        <div class="dt">每排排列方式</div>
        <div class="radio">
          <n-radio-group v-model:value="current.listType">
            <n-radio-button v-for="item in listType" :key="item.value" :value="item.value">
              {{ item.label }}
            </n-radio-button>
          </n-radio-group>
        </div>
      </div>
      <div class="group">
        <div class="dt">Icon分类样式</div>
        <div class="dd">鼠标拖拽调整广告顺序，建议尺寸{{ currentListType.size }}像素， 或同等比例</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList" handle=".is-move" group="panel" item-key="id">
            <template #item="{ element }">
              <p-panel-item :detail="element" :is-remove="current.componentContentList.length > 1" />
            </template>
          </vue-draggable>
          <div v-if="componentContentList.length < 50" class="tools-add">
            <x-upload @success="handleUploadSuccess">
              <x-button type="primary" block>添加Icon</x-button>
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
  import PPanelConfig from './p-panel-config.vue'
  import PPanelItem from './p-panel-item.vue'

  export default defineComponent({
    name: 'PPanelNav',
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
      const $store = useStore()
      const $state: any = reactive({
        current: computed(() => $store.state.pages.current),
        componentStyle: computed(() => $state.current?.componentStyle),
        currentListType: computed(() => $state.listType.find((item: any) => item.value === $state.current.listType)),
        componentContentList: computed(() => $state.current?.componentContentList || []),
        templateTypeList: [
          {
            label: '图文分类导航',
            icon: 'icon-049',
            value: 14
          }
        ],
        listType: [
          {
            label: '一个',
            value: 1,
            size: '694x694'
          },
          {
            label: '二个',
            value: 2,
            size: '340x340'
          },
          {
            label: '三个',
            value: 3,
            size: '210x210'
          },
          {
            label: '四个',
            value: 4,
            size: '150x150'
          },
          {
            label: '五个',
            value: 5,
            size: '100x100'
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
          productId: null
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
