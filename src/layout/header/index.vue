<template>
  <div class="x-header">
    <h1>LOGO</h1>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { NDropdown } from 'naive-ui'
  import { useStore } from '@/store'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'XHeader',
    components: {
      NDropdown
    },
    setup() {
      const $store = useStore()
      const $router = useRouter()
      const $state = reactive({
        options: [
          {
            label: '退出',
            key: 'logout'
          }
        ]
      })

      const handleSelect = () => {
        $store.dispatch('user/logout').then(() => {
          $router.push({
            name: 'Login'
          })
        })
      }

      return {
        ...toRefs($state),
        handleSelect
      }
    }
  })
</script>

<style lang="scss" scoped>
  .x-header {
    background-color: #2d2d2d;
    color: #fff;
    display: flex;
    align-items: center;
    height: 66px;
    padding: 0 16px;
  }
</style>
