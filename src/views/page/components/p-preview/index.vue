<template>
  <div style="display: flex; flex: 1">
    <div v-if="!readonly" class="p-aside">
      <div class="h1">组件库</div>
      <div class="component-wrapper">
        <div v-for="item in collapse" :key="item.title" class="component-box">
          <div class="title">{{ item.title }}</div>
          <vue-draggable
            v-model="item.list"
            :group="{
              name: 'preview',
              pull: 'clone',
              put: ['preview'],
              revertClone: true
            }"
            :clone="handleCloneComponent"
            :sort="false"
            item-key="type"
            class="components"
          >
            <template #item="{ element }">
              <div class="li aside-item">
                <div class="item" @click="handleComponentPush(element)">
                  <div class="icon">
                    <x-icon :name="element.vue_icon" />
                  </div>
                  <div class="name">{{ element.vue_name }}</div>
                  <div class="limit">{{ getCurrentCount(element) }}/{{ element.vue_limit }}</div>
                </div>
              </div>
            </template>
          </vue-draggable>
        </div>
      </div>
    </div>
    <div class="p-preview">
      <div v-if="!readonly" class="page-tools">
        <div :class="{ active: !current }" class="options" @click="handleSetCurrent(null)">页面设置</div>
        <div
          :class="{ active: current?.vue_componentsName === 'sort' }"
          class="options"
          @click="handleSetCurrent('sort')"
        >
          组件管理
        </div>
      </div>
      <div :style="styles" class="body">
        <div class="nav-bar" />
        <div class="preview-height">iPhone 8手机高度</div>
        <div class="page-title">
          <n-ellipsis style="max-width: 200px">
            {{ page.title || '页面标题' }}
          </n-ellipsis>
        </div>
        <vue-draggable
          v-model="page.componentList"
          :disabled="readonly"
          group="preview"
          item-key="id"
          style="min-height: 500px"
        >
          <template #item="{ element }">
            <p-draggable :detail="element" :readonly="readonly">
              <!--多组件动态引入-->
              <component :is="`p-preview-${element.vue_componentsName}`" :detail="element" />
            </p-draggable>
          </template>
        </vue-draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NEllipsis } from 'naive-ui'
  import VueDraggable from 'vuedraggable'
  import { components as PComponents } from './components/index'
  import PDraggable from './components/p-draggable.vue'
  import { useStore } from '@/store'
  import { formatStyle } from '@/utils'
  import { aside } from '../config'
  import { XIcon } from '@/components'
  import { v4 as uuidv4 } from 'uuid'

  export default defineComponent({
    name: 'PPreview',
    components: {
      ...PComponents,
      VueDraggable,
      NEllipsis,
      XIcon,
      PDraggable
    },
    props: {
      readonly: {
        type: Boolean,
        default: false
      }
    },
    setup($props) {
      const $store = useStore()
      const $state: any = reactive({
        ...toRefs($props),
        collapse: aside,
        current: computed(() => $store.state.pages.current),
        page: computed(() => $store.state.pages.page),
        styles: computed(() => formatStyle($state.page.pageStyle))
      })

      // 添加组件
      const handleComponentPush = (item: any) => {
        const count = getCurrentCount(item) || 0
        if (count < item.vue_limit) {
          const defaultValue = JSON.parse(JSON.stringify(item))
          defaultValue.id = uuidv4()
          // 添加进页面组件列表
          $state.page.componentList.push(defaultValue)
          $store.dispatch('pages/setCurrent', defaultValue)
        }
      }

      // 查询当前组件使用量
      const getCurrentCount = (row: { type: number }) => {
        const filter = $state.page.componentList?.filter((item: { type: number }) => item.type === row.type)
        return filter.length
      }

      // 设置当前
      const handleSetCurrent = (componentsName: string | null) => {
        $store.dispatch(
          'pages/setCurrent',
          componentsName
            ? {
                vue_componentsName: componentsName
              }
            : null
        )
      }

      // 克隆的值
      const handleCloneComponent = (item: any) => {
        const count = getCurrentCount(item) || 0
        if (count < item.vue_limit) {
          const defaultValue = JSON.parse(JSON.stringify(item))
          defaultValue.id = uuidv4()
          return defaultValue
        }
      }

      return {
        ...toRefs($state),
        handleSetCurrent,
        handleCloneComponent,
        handleComponentPush,
        getCurrentCount
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/var.scss';
  .p-aside {
    width: 190px;
    background-color: #fff;
    .h1 {
      height: 60px;
      line-height: 60px;
      background-color: #ebeef5;
      padding: 0 15px;
      font-size: 16px;
      font-weight: bold;
    }
    .component-box {
      .title {
        color: #646464;
        padding: 10px 15px;
      }
      .components {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        .li {
          width: 50%;
        }
      }
    }
  }
  .p-aside .component-box .components .aside-item,
  .p-preview .aside-item {
    .item {
      text-align: center;
      line-height: 1.5;
      display: inline-block;
      width: 80px;
      padding: 10px 0;
      border-radius: 3px;
      overflow: hidden;
      background-color: #fff;
      cursor: pointer;
      transition: 0.3s;
      .x-icon {
        font-size: 30px;
        line-height: 1;
      }
      .limit {
        font-size: 12px;
        color: #999;
      }
      &:not(.disabled):hover {
        background-color: $primaryColor;
        color: #fff;
        .limit {
          color: #fff;
        }
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  .p-preview .aside-item {
    width: 100%;
    .item {
      width: 100%;
      .limit {
        display: none;
      }
    }
  }
  .p-preview {
    background-color: #f3f6f8;
    padding: 60px 0;
    overflow: auto;
    scroll-behavior: smooth;
    flex: 1;
    .page-tools {
      position: fixed;
      top: 120px;
      right: 410px;
      text-align: center;
      font-size: 12px;
      color: #323233;
      z-index: 1;
      .options {
        background-color: #fff;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        width: 94px;
        height: 32px;
        line-height: 32px;
        margin-bottom: 12px;
        cursor: pointer;

        &.active {
          background-color: $primaryColor;
          color: #ffffff;
        }
      }
    }
    .body {
      background-color: #f8f8f8;
      width: 375px;
      min-height: 800px;
      margin: 0 auto;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
      position: relative;
      &:before {
        content: '';
        position: absolute;
        pointer-events: none;
        z-index: 99;
        width: 100%;
        height: 64px;
        left: 0;
        top: 0;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACACAYAAABUfOzJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY0QzY0QTAzOEY2QzExRUE4QTk3OTQ4MUQwOTE3NDFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY0QzY0QTA0OEY2QzExRUE4QTk3OTQ4MUQwOTE3NDFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjRDNjRBMDE4RjZDMTFFQThBOTc5NDgxRDA5MTc0MUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjRDNjRBMDI4RjZDMTFFQThBOTc5NDgxRDA5MTc0MUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7sxyNMAAAbC0lEQVR42uzd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')
          no-repeat;
        background-size: cover;
      }
      .nav-bar {
        background-color: #fff;
        height: 70px;
      }
      .preview-height {
        position: absolute;
        left: 0;
        top: 649px;
        transform: translate(-100%, 0);
        font-size: 12px;
        width: 130px;
        border-bottom: 1px solid #dedede;
        color: #a4a4a4;
      }
      .page-title {
        position: absolute;
        width: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        left: 0;
        top: 32px;
        z-index: 9;
      }
    }
  }
</style>
