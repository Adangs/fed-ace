<template>
  <i :class="classNameList" :style="styles" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: 'inherit'
    }
  })

  const classNameList = computed(() => {
    return ['x-icon', props.name].join(' ')
  })
  const styles = computed(() => {
    return {
      'font-size': typeof props.size === 'number' ? `${props.size}px` : props.size,
      color: props.color
    }
  })
</script>

<style lang="scss"></style>
