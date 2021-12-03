<template>
  <div class="p-aside">
    <div class="h1">组件库</div>
    <div class="component-wrapper">
      <div v-for="item in collapse" :key="item.title" class="component-box">
        <div class="title">{{ item.title }}</div>
        <div class="components">
          <div v-for="label in item.list" :key="label.type" class="li">
            <div class="item" @click="handleComponentPush(label)">
              <div class="icon">
                <x-icon :name="label.vue_icon" />
              </div>
              <div class="name">{{ label.vue_name }}</div>
              <div class="limit">{{ getCurrentCount(label) }}/{{ label.vue_limit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import { XIcon } from '@/components'
  import { useStore } from '@/store'
  import { aside } from '../config'

  export default defineComponent({
    name: 'PAside',
    components: {
      XIcon
    },
    setup() {
      const $store = useStore()
      const $state = reactive({
        collapse: aside,
        page: computed(() => $store.state.pages.page)
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

      // 开发调试
      // handleComponentPush($state.collapse[0].list[0])

      // 查询当前组件使用量
      const getCurrentCount = (row: { type: number }) => {
        const filter = $state.page.componentList?.filter((item: { type: number }) => item.type === row.type)
        return filter.length
      }

      return {
        ...toRefs($state),
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
          text-align: center;
          line-height: 1.5;
        }
        .item {
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
    }
  }
</style>
