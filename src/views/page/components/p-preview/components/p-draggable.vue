<template>
  <div :class="classNameList" @click.stop="handleCurrent">
    <div class="_body">
      <slot />
    </div>
    <div v-if="!readonly" class="_tools">
      <div class="tools-box flex">
        <div class="name">{{ detail.vue_name }}</div>
        <div class="btn-box">
          <n-tooltip content="点击删除">
            <template #trigger>
              <div class="del" @click.stop="handleRemove">
                <i class="x-icon icon-036" />
              </div>
            </template>
            点击删除
          </n-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NTooltip } from 'naive-ui'
  import { useStore } from '@/store'

  export default defineComponent({
    name: 'PDraggable',
    components: {
      NTooltip
    },
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    setup($props) {
      const $store = useStore()
      const $state = reactive({
        ...toRefs($props),
        current: computed(() => $store.state.pages.current),
        classNameList: computed(() => {
          const arr = ['p-draggable']
          if ($state.current?.id === $props.detail.id) {
            arr.push('is-active')
          }
          // 悬浮固定
          if ($props.detail.type === 9 && $props.detail.templateType === 15) {
            arr.push('is-fixed is-fixed-right')
          }
          // 只读
          if ($props.readonly) {
            arr.push('is-readonly')
          }
          // 工具栏位置
          if ($props.detail.type === 6) {
            arr.push('is-placement-top')
          } else {
            arr.push('is-placement-center')
          }
          return arr.join(' ')
        })
      })

      // 删除当前
      const handleRemove = () => {
        $store.dispatch('pages/setCurrent', null)
        $store.dispatch('pages/removeComponent', $props.detail)
      }

      // 设置选中
      const handleCurrent = () => {
        $store.dispatch('pages/setCurrent', $props.detail)
      }

      return {
        ...toRefs($state),
        handleRemove,
        handleCurrent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/var.scss';
  .p-draggable {
    position: relative;
    &.is-fixed {
      z-index: 999;
      position: fixed;

      &.is-fixed-right {
        top: 60vh;
        transform: translateX(325px);
      }
      &.is-fixed-bottom {
        width: 375px;
        bottom: 60px;
      }
    }
    // 选中状态
    &.is-active,
    &:hover {
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px dashed $primaryColor;
        left: -1px;
        top: -1px;
        pointer-events: none;
        z-index: 5;
      }
    }
    &:hover {
      ._tools {
        .tools-box {
          .name {
            display: none;
          }
          .btn-box {
            display: block;
          }
        }
      }
    }
    &.is-active:after {
      border: 3px solid $primaryColor;
      left: -3px;
      top: -3px;
    }
    &.draggable-item {
      .x-draggable-body {
        cursor: move;
      }
    }
    // 只读
    &.is-readonly {
      &.is-active,
      &:hover {
        &:after {
          display: none;
        }
      }
    }
    // 工具
    ._tools {
      position: absolute;
      right: 0;
      padding-left: 25px;
      height: 30px;
      &:before {
        content: '';
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translate(0, -50%);
        border-radius: 50%;
        width: 5px;
        height: 5px;
        overflow: hidden;
        border: 3px solid #ccc;
        background-color: #fff;
      }

      .tools-box {
        height: 30px;
        border-radius: 40px;
        font-size: 14px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background: #ffffff;
        overflow: hidden;
        .name {
          width: max-content;
          background-color: #fff;
          padding: 5px 15px;
          cursor: pointer;
        }
        .btn-box {
          display: none;
          height: 100%;
          .del {
            height: 100%;
            padding: 0 8px;
            line-height: 28px;
            border: 2px solid #eeeeee;
            color: #a4a4a4;
            cursor: pointer;
            border-radius: 40px;
          }
        }
      }
    }

    // 工具栏出现的位置
    &.is-placement-center {
      ._tools {
        top: 50%;
        transform: translate3d(100%, -50%, 0);
      }
    }
    &.is-placement-top {
      ._tools {
        top: 0;
        transform: translate3d(100%, 0, 0);
      }
    }
  }
</style>
