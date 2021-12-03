<template>
  <div class="x-layout-main">
    <header v-if="$slots.header" class="header">
      <slot name="header"></slot>
    </header>

    <main class="main">
      <div ref="g-container" :style="containerStyle" class="g-container">
        <slot></slot>
      </div>
    </main>

    <footer v-if="$slots.footer" class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  export default defineComponent({
    name: 'XLayoutMain',
    props: {
      containerStyle: {
        type: [String, Object],
        default: null
      }
    },
    setup($props) {
      const $state = reactive({
        ...toRefs($props)
      })
      return {
        ...toRefs($state)
      }
    }
  })
</script>

<style scoped lang="scss">
  .x-layout-main {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height));
    min-width: 900px;
    overflow: hidden;

    .header {
      z-index: 1;
      background: #ffffff;
      padding: 20px 20px 0;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
    }

    .main {
      flex: 1;
      overflow: auto;
    }

    .footer {
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0 -6px 6px rgba(0, 0, 0, 0.05);
      z-index: 1;
      padding: 0 20px;
    }
  }
</style>
