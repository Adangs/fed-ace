<template>
  <div class="x-panel-template">
    <div class="x-application-title">魔方</div>
    <div class="x-body">
      <div class="group template">
        <div class="dt">选择模板</div>
        <div class="radio">
          <el-radio-group v-model="current.templateType">
            <el-tooltip v-for="(item, index) in templateType" :key="index" :content="item.name">
              <el-radio-button :label="item.value"><i :class="item.icon" /></el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </div>
      </div>
      <div class="group">
        <div class="dt">图文导航样式</div>
        <div class="dd">此模块仅支持选择商品列表模式，无跳转，仅支持在首页展示。最少添加4个导航</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList">
            <x-panel-item
              v-for="(item, index) in children"
              :key="index"
              :detail="item"
              :del="current.componentContentList.length > 4"
              :landing="false"
              :link-type="false"
              use="floor"
              goods
              @delete="onDelete"
            />
          </vue-draggable>
        </div>
      </div>
      <!--能用配置项-->
      <x-panel-config class="group" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueDraggable from 'vuedraggable'
import XPanelConfig from '../x-panel-config'
import XPanelItem from '../x-panel-item'

export default {
  name: 'XPanelFloor',
  components: {
    XPanelConfig,
    XPanelItem,
    VueDraggable
  },
  props: {},
  data () {
    return {
      templateType: [{
        name: '副标题',
        icon: 'deco-icon-tabs-1',
        value: 4
      }, {
        name: '楼层',
        icon: 'deco-icon-shopnote-hybrid',
        value: 5
      }]
    }
  },
  computed: {
    ...mapState({
      current: state => state.application.current || {}
    }),
    children () {
      return this.current.componentContentList || []
    }
  },
  watch: {},
  created () {

  },
  methods: {
    onDelete (index) {
      this.current.componentContentList.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
