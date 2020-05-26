<template>
  <div class="x-application-panel">
    <x-panel-banner v-if="current.type === 1" />
    <x-panel-tag v-if="current.type === 2" />
    <x-panel-icon v-if="current.type === 3" />
    <x-panel-cube v-if="current.type === 4" />
    <x-panel-floor v-if="current.type === 5" />
    <x-panel-goods v-if="current.type === 6" />
    <x-panel-basis v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XPanelBasis from './components/x-panel-basis'
import XPanelBanner from './components/x-panel-banner'
import XPanelTag from './components/x-panel-tag'
import XPanelIcon from './components/x-panel-icon'
import XPanelCube from './components/x-panel-cube'
import XPanelFloor from './components/x-panel-floor'
import XPanelGoods from './components/x-panel-goods'

export default {
  name: 'XPanel',
  components: {
    XPanelBasis,
    XPanelBanner,
    XPanelTag,
    XPanelIcon,
    XPanelCube,
    XPanelFloor,
    XPanelGoods
  },
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      current: state => state.application.current || {}
    })
  },
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="less">
  .x-application-panel{
    width: 460px; background-color: #fff;
    ul,li,dl,dt,dd,em,strong{ font-style: normal; margin: 0; padding: 0; list-style: none;}
    .x-panel-template{ height: 100%; overflow: hidden; display: flex; box-orient: vertical; flex-direction: column; }
    .x-body{
      padding: 20px; overflow: hidden; overflow-y: auto; flex: 1;
      .group{
        padding: 20px 0;
        &:last-child{ padding-bottom: 0;}
        &.template{
          border-bottom: 1px solid #E5E5E5;
          .radio{
            padding-top: 5px;
            .el-radio-button__inner{ padding: 5px 15px;}
            .el-radio-button i{ font-size: 20px;}
            .el-radio-button__orig-radio:checked + .el-radio-button__inner{ background-color: rgba(0, 132, 255, 0.11); color: #0084FF;}
          }
        }
        &:first-child{ padding-top: 0;}
        .dt{ font-size: 14px; color: #646464; padding-bottom: 5px;}
        .dd{ font-size: 13px; color: #A4A4A4;}
        .content{
          background-color: #F3F6F8; padding: 10px; margin-top: 15px;
          .x-panel-item:last-child{ margin-bottom: 0;}
        }
      }
    }
    .x-panel-config{
      border-top: 1px solid #E5E5E5;
      ._container{
        display: flex; align-items: center; font-size: 13px; margin-bottom: 10px;
        &:last-child{ margin-bottom: 0;}
      }
      ._label{ padding-right: 1em; color: #646464; min-width: 5em;}
      ._value{ flex: 1; font-weight: bold;}
      // ._tools{ width: 100px; text-align: right;}
    }
  }
</style>
