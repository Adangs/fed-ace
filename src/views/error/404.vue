<template>
  <div class="m-404">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button tag="a" href="login">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NResult, NButton } from 'naive-ui'

  export default defineComponent({
    name: 'Error',
    components: {
      NButton,
      NResult
    },
    setup() {}
  })
</script>

<style lang="scss">
  .m-404 {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
