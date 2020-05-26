<template>
  <div class="x-panel-template">
    <div class="x-application-title">Banner广告</div>
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
        <div class="dt">Banner样式</div>
        <div class="dd">最多添加5个广告，鼠标拖转调整广告顺序，建议尺寸750x450像素</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList">
            <x-panel-item
              v-for="(item, index) in children"
              :key="index"
              :detail="item"
              :index="index"
              :del="current.componentContentList.length > 1"
              use="banner"
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
  name: 'XPanelBanner',
  components: {
    XPanelConfig,
    XPanelItem,
    VueDraggable
  },
  props: {},
  data () {
    return {
      templateType: [{
        name: '轮播',
        icon: 'deco-icon-indicator-1',
        value: 1
      }, {
        name: '一行一个',
        icon: 'deco-icon-16-9',
        value: 2
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
