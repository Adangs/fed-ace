<template>
  <div class="m-login">
    <div class="hallo">
      <h1>Hello word…</h1>
      <x-button type="primary">Login…</x-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { XButton } from '@/components'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Login',
    components: {
      XButton
    },
    setup() {
      const $router = useRouter()
      const $state = reactive({})

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .m-login {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1 {
      color: #999;
      font-size: 90px;
      font-weight: normal;
    }
  }
</style>
