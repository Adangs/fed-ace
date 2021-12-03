<template>
  <div class="p-panel-template">
    <div class="h1">组件管理</div>
    <div class="p-body">
      <div v-if="page.componentList && page.componentList.length" class="p-panel-sort">
        <vue-draggable v-model="page.componentList" handle=".is-move" group="panel" item-key="id">
          <template #item="{ element }">
            <div class="item">
              <div class="before">
                <x-icon :size="18" name="icon-057" class="is-move" />
              </div>
              <div class="name">{{ element.vue_name }}</div>
              <div class="after">
                <x-icon :size="18" name="icon-036" @click="handleRemove(element)" />
              </div>
            </div>
          </template>
        </vue-draggable>
      </div>
      <n-empty v-else description="试着添加几个组件看看" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { NEmpty } from 'naive-ui'
  import VueDraggable from 'vuedraggable'
  import { useStore } from '@/store'
  import { XIcon } from '@/components'

  export default defineComponent({
    name: 'PPanelSort',
    components: {
      VueDraggable,
      NEmpty,
      XIcon
    },
    setup() {
      const $store = useStore()
      const $state = reactive({
        page: computed(() => $store.state.pages.page)
      })

      // 删除组件
      const handleRemove = (row: { id: number | string }) => {
        const componentList = $state.page.componentList
        const findIndex = componentList.findIndex((item: any) => item.id === row.id)
        $state.page.componentList.splice(findIndex, 1)
      }

      return {
        ...toRefs($state),
        handleRemove
      }
    }
  })
</script>

<style lang="scss" scoped>
  .p-panel-sort {
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      background-color: #fafafa;
      padding: 3px 10px;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        .after {
          display: block;
        }
      }
      .after {
        display: none;
      }
      .name {
        flex: 1;
        padding: 0 10px;
      }
      .x-icon {
        cursor: pointer;
      }
      .is-move {
        cursor: move;
      }
    }
  }
</style>
