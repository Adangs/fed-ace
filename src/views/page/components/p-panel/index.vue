<template>
  <div class="p-panel">
    <!--多组件动态引入-->
    <component :is="componentName" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from '@/store'
  import { components as PComponents } from './components/index'

  export default defineComponent({
    name: 'PPanel',
    components: {
      ...PComponents
    },
    setup() {
      const $store = useStore()
      const $state = reactive({
        componentName: computed(() => {
          const current = $store.state.pages.current
          if (current) {
            return `p-panel-${current?.vue_componentsName}`
          } else {
            return 'p-panel-basis'
          }
        })
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-panel {
    width: 400px;
    background-color: #fff;
  }
</style>
<style lang="scss">
  @import '@/assets/styles/var.scss';
  .p-panel-template {
    .h1 {
      height: 60px;
      line-height: 60px;
      background-color: #ebeef5;
      padding: 0 15px;
      font-size: 16px;
      font-weight: bold;
    }
    height: 100%;
    overflow: hidden;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
    .p-body {
      padding: 20px;
      overflow: hidden;
      overflow-y: auto;
      flex: 1;
      .group {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        &:first-child {
          padding-top: 0;
        }
        .dt {
          font-size: 14px;
          font-weight: bold;
          color: #555;
          padding-bottom: 5px;
        }
        .dd {
          font-size: 13px;
          color: #a4a4a4;
        }
        .content {
          background-color: #f3f6f8;
          padding: 10px;
          margin-top: 15px;
          border-radius: 6px;
        }
      }
    }
    .n-upload-trigger {
      display: block;
    }
  }
</style>
