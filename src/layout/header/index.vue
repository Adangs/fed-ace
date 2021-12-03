<template>
  <div class="x-header">
    <h1>LOGO</h1>

    <div class="avatar">
      <n-dropdown :options="options" trigger="hover" show-arrow @select="handleSelect">
        <div class="flex">
          <div class="pic">
            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </div>
          <div class="user-name">Github</div>
        </div>
      </n-dropdown>
    </div>
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
    h1 {
      flex: 1px;
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .user-name {
      padding-left: 10px;
    }
    .avatar {
      cursor: pointer;
      .pic {
        background-color: #fff;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
