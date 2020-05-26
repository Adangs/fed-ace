<template>
  <div class="x-application-preview" @click.stop>
    <div class="preview-height">iPhone 8手机高度</div>
    <div class="page-title">{{ page.title || '' }}</div>
    <template v-if="page && page.componentList">
      <vue-draggable v-model="page.componentList">
        <x-draggable
          v-for="(item, index) in page.componentList"
          :key="index"
          :detail="item"
          :active="current.id === item.id"
          :placement="[5, 6].some(s => s === item.type) ? 'top': 'center'"
        >
          <!--banner-->
          <x-preview-banner v-if="item.type === 1" :detail="item" />
          <!--tag-->
          <x-preview-tag v-if="item.type === 2" :detail="item" />
          <!--icon-->
          <x-preview-icon v-if="item.type === 3" :detail="item" />
          <!--魔方-->
          <x-preview-cube v-if="item.type === 4" :detail="item" />
          <!--楼层-->
          <x-preview-floor v-if="item.type === 5" :detail="item" />
          <!--商品-->
          <x-preview-goods v-if="item.type === 6" :detail="item" />
        </x-draggable>
      </vue-draggable>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueDraggable from 'vuedraggable'
import XDraggable from '../x-draggable'
import XPreviewBanner from './components/x-preview-banner'
import XPreviewTag from './components/x-preview-tag'
import XPreviewIcon from './components/x-preview-icon'
import XPreviewCube from './components/x-preview-cube'
import XPreviewFloor from './components/x-preview-floor'
import XPreviewGoods from './components/x-preview-goods/index'

export default {
  name: 'XPreview',
  components: {
    VueDraggable,
    XDraggable,
    XPreviewBanner,
    XPreviewTag,
    XPreviewIcon,
    XPreviewCube,
    XPreviewFloor,
    XPreviewGoods
  },
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      page: state => state.application.page,
      current: state => state.application.current || {}
    })
  },
  watch: {},
  created () {
    // console.log(this.page)
  },
  methods: {}
}
</script>

<style lang="less">
  .x-application-preview{
    background-color: #f8f8f8; width: 375px; min-height: 800px; margin: 0 auto; box-shadow: 0 0 14px rgba(0,0,0,.1); position: relative;
    &:before{ content: ''; position: absolute; pointer-events: none; z-index: 99; width: 100%; height: 64px; left: 0; top: 0; background: url('../../../../assets/images/navbar-white.png') no-repeat; background-size: cover;}
    .preview-height{ position: absolute; left: 0; top: 649px; transform: translate(-100%, 0); font-size: 12px; width: 130px; border-bottom: 1px solid #dedede; color: #A4A4A4;}
    .page-title{ position: absolute; width: 100%; color: #fff; text-align: center; font-weight: bold; font-size: 16px; left: 0; top: 32px; z-index: 9;}
  }
  .x-application-title{ height: 60px; line-height: 60px; background-color: #EBEEF5; padding: 0 15px; font-size: 16px; font-weight: bold;}
</style>
