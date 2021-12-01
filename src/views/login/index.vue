<template>
  <div class="m-login">
    <div class="hallo">
      <div>
        <n-gradient-text :size="124" type="success">Hello word…</n-gradient-text>
      </div>
      <x-button type="primary" @click="handleLogin">Login…</x-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { NGradientText } from 'naive-ui'
  import { XButton } from '@/components'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Login',
    components: {
      NGradientText,
      XButton
    },
    setup() {
      const $store = useStore()
      const $router = useRouter()
      const $state = reactive({})

      const handleLogin = () => {
        $store.dispatch('user/login').then(() => {
          $router.push({
            name: 'PageCreate'
          })
        })
      }

      return {
        ...toRefs($state),
        handleLogin
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
