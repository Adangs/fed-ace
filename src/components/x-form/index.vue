<template>
  <n-form ref="formRef" :class="classNameList" v-bind="props">
    <slot />
  </n-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, watch, computed } from 'vue'
  import { NForm } from 'naive-ui'

  export default defineComponent({
    name: 'XForm',
    components: {
      NForm
    },
    props: {
      ...NForm.props,
      // inline状态下支持自动换行
      wrap: {
        type: Boolean,
        default: false
      }
    },
    setup($props, { emit: $emit }) {
      const formRef: any = ref(null)
      // eslint-disable-next-line vue/no-setup-props-destructure
      let defaultValue: any = JSON.parse(JSON.stringify($props.model))
      const $state = reactive({
        props: toRefs($props) || {},
        classNameList: computed(() => {
          const arr = ['x-form']
          if ($props.inline && $props.wrap) {
            arr.push('is-wrap')
          }
          return arr.join(' ')
        })
      })
      // 验证表单，Promise rejection 的返回值类型是 Array<FormValidationError>
      const validate = (fun: any) => {
        formRef.value.validate(fun)
      }
      // 还原到未校验的状态
      const restoreValidation = () => {
        formRef.value.restoreValidation()
      }
      // 重置表单值
      const resetFields = () => {
        restoreValidation()
        $emit('update:model', JSON.parse(JSON.stringify(defaultValue)))
      }
      // 重置表单默认值
      const resetDefaultValue = (model?: any) => {
        restoreValidation()
        defaultValue = model || null
      }

      // watch
      watch(
        () => $props.model,
        () => {
          if (!defaultValue) {
            defaultValue = JSON.parse(JSON.stringify($props.model))
          }
        }
      )

      return {
        ...toRefs($state),
        formRef,
        validate,
        restoreValidation,
        resetFields,
        resetDefaultValue
      }
    }
  })
</script>

<style lang="scss" scoped>
  .n-form--inline {
    &.is-wrap {
      flex-wrap: wrap;
    }
  }
</style>
