<template>
  <div class="x-header"> x-header </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'XHeader',
    components: {},
    setup() {
      const $store = useStore()
      const $router = useRouter()
      const $state = reactive({})

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
