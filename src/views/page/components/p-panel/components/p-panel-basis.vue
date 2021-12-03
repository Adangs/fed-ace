<template>
  <div class="p-panel-template">
    <div class="h1">页面设置</div>
    <div class="p-body">
      <div class="group">
        <x-form ref="formRef" :model="page" :rules="rules" :label-width="80" label-placement="left">
          <n-form-item label="页面标题" path="title">
            <n-input v-model:value="page.title" placeholder="请输入页面标题" />
          </n-form-item>
          <n-form-item label="背景色">
            <n-color-picker v-model:value="styles.backgroundColor" :show-alpha="false" />
          </n-form-item>
        </x-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NInput, NFormItem, NColorPicker } from 'naive-ui'
  import { XForm } from '@/components'
  import { useStore } from '@/store'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    name: 'PPanelBasis',
    components: {
      NInput,
      NFormItem,
      NColorPicker,
      XForm
    },
    setup() {
      const $router = useRouter()
      const $route = useRoute()
      const $store = useStore()
      const $state: any = reactive({
        page: computed(() => $store.state.pages.page),
        styles: computed(() => $state.page?.pageStyle),
        rules: {
          title: { required: true, message: '请输入页面标题', trigger: 'blur' }
        }
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style></style>
