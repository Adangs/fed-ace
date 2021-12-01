<template>
  <n-button class="x-button" v-bind="props" :disabled="props.disabled || props.loading">
    <template v-if="$slots.icon || icon" #icon>
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <x-icon v-else :name="icon" :size="18" />
    </template>
    <slot />
  </n-button>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { NButton } from 'naive-ui'
  import { XIcon } from '@/components'

  export default defineComponent({
    name: 'XButton',
    components: {
      NButton,
      XIcon
    },
    props: {
      ...NButton.props,
      icon: {
        type: String,
        default: ''
      }
    },
    setup($props, { emit: $emit }) {
      const $state = reactive({
        props: toRefs($props) || {}
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .x-button {
    & + .x-button {
      margin-left: 10px;
    }
  }
</style>
