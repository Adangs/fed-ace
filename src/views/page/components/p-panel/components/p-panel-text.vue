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
        <div class="dt">内容</div>
        <div class="content">
          <x-form ref="formRef" v-model:model="formData" size="small">
            <n-form-item label="标题内容：" path="title">
              <n-input v-model:value="formData.title" clearable placeholder="请输入标题内容" />
            </n-form-item>
            <n-form-item label="描述内容：" path="remark">
              <n-input v-model:value="formData.remark" type="textarea" clearable placeholder="请输入描述内容" />
            </n-form-item>
          </x-form>
        </div>
      </div>
      <p-panel-config :detail="contentStyle" title="文本样式" />
      <p-panel-config :detail="componentStyle" title="主体样式" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NRadioGroup, NRadioButton, NTooltip, NInput, NFormItem } from 'naive-ui'
  import { XForm, XIcon } from '@/components'
  import { useStore } from '@/store'
  import PPanelConfig from './p-panel-config.vue'

  export default defineComponent({
    name: 'PPanelText',
    components: {
      NRadioGroup,
      NRadioButton,
      NTooltip,
      NInput,
      NFormItem,
      XForm,
      XIcon,
      PPanelConfig
    },
    setup() {
      const $store = useStore()
      const $state: any = reactive({
        current: computed(() => $store.state.pages.current),
        componentStyle: computed(() => $state.current?.componentStyle),
        formData: computed(() => $state.current?.componentContentList[0]),
        contentStyle: computed(() => $state.current?.componentContentList[0].contentStyle),
        currentTemplateType: computed(() =>
          $state.templateTypeList.find((item: { value: number }) => item.value === $state.current.templateType)
        ),
        templateTypeList: [
          {
            label: '单排样式',
            icon: 'icon-041',
            value: 12
          },
          {
            label: '双排样式',
            icon: 'icon-042',
            value: 13
          }
        ]
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style></style>
