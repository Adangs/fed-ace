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
        <div class="dt">商城标签样式</div>
        <div class="dd">此模板仅作为展示使用，当前仅可以添加3个标签，建议尺寸26x26像素</div>
        <div class="content">
          <vue-draggable v-model="current.componentContentList">
            <x-panel-item
              v-for="(item, index) in children"
              :key="index"
              :detail="item"
              :del="current.componentContentList.length > 2"
              use="tag"
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
import XPanelItem from '../x-panel-item'
import XPanelConfig from '../x-panel-config'

export default {
  name: 'XPanelTag',
  components: {
    XPanelItem,
    XPanelConfig,
    VueDraggable
  },
  props: {},
  data () {
    return {
      templateType: [{
        name: '默认',
        icon: 'deco-icon-nav-slide',
        value: 0
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
