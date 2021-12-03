<template>
  <div class="group">
    <div class="dt">{{ title }}</div>
    <div class="content">
      <x-form ref="formRef" :model="styles" :label-width="120" label-placement="left">
        <n-form-item v-if="isShowBlock('textAlign')" label-align="left" label="对齐方式">
          <n-radio-group v-model:value="styles.textAlign" style="background-color: #fff">
            <n-radio-button v-for="(item, index) in alignList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <x-icon :name="item.icon" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('titleFontSize')" label-align="left" label="标题大小">
          <n-radio-group v-model:value="styles.titleFontSize" style="background-color: #fff">
            <n-radio-button v-for="(item, index) in fontSizeList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <x-icon :name="item.icon" :size="item.value" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('descFontSize')" label-align="left" label="描述大小">
          <n-radio-group v-model:value="styles.descFontSize" style="background-color: #fff">
            <n-radio-button v-for="(item, index) in fontSizeList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <x-icon :name="item.icon" :size="item.value" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('buttonFontSize')" label-align="left" label="按钮大小">
          <n-radio-group v-model:value="styles.buttonFontSize" style="background-color: #fff">
            <n-radio-button v-for="(item, index) in fontSizeList" :key="index" :value="item.value">
              <n-tooltip>
                <template #trigger>
                  <x-icon :name="item.icon" :size="item.value" />
                </template>
                {{ item.label }}
              </n-tooltip>
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('titleFontWeight')" label-align="left" label="标题文字粗细">
          <n-radio-group v-model:value="styles.titleFontWeight">
            <n-radio v-for="(item, index) in fontWeightList" :key="index" :value="item.value">
              {{ item.label }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('descFontWeight')" label-align="left" label="描述文字粗细">
          <n-radio-group v-model:value="styles.descFontWeight">
            <n-radio v-for="(item, index) in fontWeightList" :key="index" :value="item.value">
              {{ item.label }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('buttonFontWeight')" label-align="left" label="按钮文字粗细">
          <n-radio-group v-model:value="styles.buttonFontWeight">
            <n-radio v-for="(item, index) in fontWeightList" :key="index" :value="item.value">
              {{ item.label }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="isShowBlock('color')" label-align="left" label="文字颜色">
          <n-color-picker v-model:value="styles.color" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('titleColor')" label-align="left" label="标题文字颜色">
          <n-color-picker v-model:value="styles.titleColor" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('descColor')" label-align="left" label="描述文字颜色">
          <n-color-picker v-model:value="styles.descColor" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('buttonColor')" label-align="left" label="按钮文字颜色">
          <n-color-picker v-model:value="styles.buttonColor" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('buttonBackgroundColor')" label-align="left" label="按钮背景颜色">
          <n-color-picker v-model:value="styles.buttonBackgroundColor" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('backgroundColor')" label-align="left" label="背景颜色">
          <n-color-picker v-model:value="styles.backgroundColor" :show-alpha="false" />
          <x-button type="primary" size="tiny" text style="margin-left: 10px">重置</x-button>
        </n-form-item>
        <n-form-item v-if="isShowBlock('marginBottom')" label-align="left" label="底部间距">
          <n-slider v-model:value="styles.marginBottom" :max="20" />
        </n-form-item>
      </x-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NColorPicker, NSlider, NFormItem, NRadioGroup, NRadioButton, NRadio, NTooltip } from 'naive-ui'
  import { XForm, XButton, XIcon } from '@/components'

  export default defineComponent({
    name: 'PPanelConfig',
    components: {
      NRadioGroup,
      NRadioButton,
      NRadio,
      NTooltip,
      NColorPicker,
      NSlider,
      NFormItem,
      XForm,
      XIcon,
      XButton
    },
    props: {
      title: {
        type: String,
        default: '主体样式'
      },
      detail: {
        type: Object,
        default: () => {}
      }
    },
    setup($props) {
      const $state = reactive({
        styles: computed(() => $props.detail),
        stylesKeys: computed(() => Object.keys($props.detail || {})),
        alignList: [
          {
            label: '居左显示',
            icon: 'icon-054',
            value: 'left'
          },
          {
            label: '居中显示',
            icon: 'icon-055',
            value: 'center'
          },
          {
            label: '居右显示',
            icon: 'icon-056',
            value: 'right'
          }
        ],
        fontSizeList: [
          {
            label: '大（18号）',
            icon: 'icon-038',
            value: 18
          },
          {
            label: '中（16号）',
            icon: 'icon-038',
            value: 16
          },
          {
            label: '小（14号）',
            icon: 'icon-038',
            value: 14
          }
        ],
        fontWeightList: [
          {
            label: '常规',
            value: 'normal'
          },
          {
            label: '加粗',
            value: 'bold'
          }
        ]
      })

      // 是否显示当前模块
      const isShowBlock = (key: string) => {
        return $state.stylesKeys.includes(key)
      }

      return {
        ...toRefs($state),
        isShowBlock
      }
    }
  })
</script>

<style lang="scss"></style>
