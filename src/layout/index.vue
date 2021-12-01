<template>
  <n-layout content-style="display: flex; flex-direction: column; overflow: hidden; height: 100vh;">
    <n-layout-header v-if="!query.hideHeader" bordered>
      <t-header outer />
    </n-layout-header>

    <n-layout class="main-content-layout">
      <n-layout-content :native-scrollbar="false">
        <t-content />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui'
  import THeader from './header/index.vue'
  import TContent from './content/index.vue'
  import { useRoute } from 'vue-router'

  export default defineComponent({
    name: 'Layout',
    components: {
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      THeader,
      TContent
    },
    setup() {
      const $route = useRoute()
      const { query } = $route
      const $state = reactive({
        query
      })

      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style></style>
