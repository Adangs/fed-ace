<template>
  <div class="x-panel-template">
    <div class="x-application-title">商城标签</div>
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
        <div class="dt">ICON样式</div>
        <div class="dd">单排需添加4个icon，双排需添加8个icon，鼠标拖拽调整广告顺序，建议尺寸100x100像素</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList">
            <x-panel-item
              v-for="(item, index) in children"
              :key="index"
              :detail="item"
              :del="current.componentContentList.length > 3"
              use="icon"
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
  name: 'XPanelTag',
  components: {
    XPanelConfig,
    XPanelItem,
    VueDraggable
  },
  props: {},
  data () {
    return {
      templateType: [{
        name: '单排',
        icon: 'deco-icon-line-solid',
        value: 2
      }, {
        name: '双排',
        icon: 'deco-icon-line',
        value: 3
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
