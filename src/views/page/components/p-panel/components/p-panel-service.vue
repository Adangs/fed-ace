<template>
  <div v-if="current" class="p-panel-template p-panel-service">
    <div class="h1">{{ current.vue_name }}</div>
    <div class="p-body">
      <div class="group template">
        <div class="dt">选择模板</div>
        <div class="radio">
          <n-radio-group v-model:value="current.templateType">
            <n-radio-button v-for="(item, index) in templateTypeList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <img style="width: 26px; height: 26px" :src="item.icon" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </div>
      </div>
      <div class="group">
        <template v-if="current.templateType === 14">
          <div class="dt">Logo</div>
          <div class="dd">建议尺寸80x80像素，或同等比例</div>
        </template>
        <template v-else>
          <div class="dt">悬浮Icon</div>
          <div class="dd">建议尺寸100x100像素，或同等比例</div>
        </template>
        <div class="pic">
          <x-upload @success="handleUploadSuccess">
            <img :src="formData.imgUrl" />
            <div class="tips">更换图片</div>
          </x-upload>
        </div>
      </div>
      <div class="group">
        <div class="dt">内容</div>
        <div class="content">
          <x-form ref="formRef" v-model:model="formData" size="small">
            <n-form-item label="标题内容：" path="title">
              <n-input v-model:value="formData.title" maxlength="10" clearable placeholder="最多输入10个字" />
            </n-form-item>
            <n-form-item label="描述内容：" path="remark">
              <n-input v-model:value="formData.remark" maxlength="10" clearable placeholder="最多输入10个字" />
            </n-form-item>
            <n-form-item label="按钮内容：" path="buttonDesc">
              <n-input v-model:value="formData.buttonDesc" maxlength="10" clearable placeholder="最多输入10个字" />
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
  import { XForm, XUpload } from '@/components'
  import { useStore } from '@/store'
  import PPanelConfig from './p-panel-config.vue'
  import templateIcon1 from '@/assets/images/svg-kefu-type1.svg'
  import templateIcon2 from '@/assets/images/svg-kefu-type2.svg'

  export default defineComponent({
    name: 'PPanelService',
    components: {
      NRadioGroup,
      NRadioButton,
      NTooltip,
      NInput,
      NFormItem,
      XForm,
      XUpload,
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
            label: '固定',
            icon: templateIcon1,
            value: 14
          },
          {
            label: '悬浮',
            icon: templateIcon2,
            value: 15
          }
        ]
      })

      // 上传成功
      const handleUploadSuccess = (res: { fileUrl: string }) => {
        $state.formData.imgUrl = res.fileUrl
      }

      return {
        ...toRefs($state),
        handleUploadSuccess
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-panel-service {
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
      margin-top: 10px;
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
  }
</style>
