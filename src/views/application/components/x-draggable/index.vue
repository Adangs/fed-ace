<template>
  <div :class="classNameList" @click.stop="onChange">
    <div class="x-draggable-body">
      <slot />
    </div>
    <div class="x-draggable-tools">
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XDraggable',
  components: {},
  props: {
    active: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    placement: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {}
  },
  computed: {
    classNameList () {
      const arr = ['x-draggable']
      if (this.active) {
        arr.push('is-active')
      }
      arr.push(`is-${this.placement}`)
      return arr.join(' ')
    },
    name () {
      let name
      switch (this.detail.type) {
        case 1:
          name = 'Banner广告'
          break
        case 2:
          name = '商城标签'
          break
        case 3:
          name = 'ICON'
          break
        case 4:
          name = '魔方'
          break
        case 5:
          name = '图文导航'
          break
        case 6:
          name = '商品'
          break
      }
      return name
    }
  },
  watch: {},
  created () {

  },
  methods: {
    onChange () {
      this.$store.dispatch('application/SetCurrent', this.detail)
    }
  }
}
</script>

<style lang="less">
  .x-draggable{
    position: relative;
    // 选中状态
    &.is-active,
    &:hover{
      &:after{ content: ''; position: absolute; width: 100%; height: 100%; border: 1px dashed #0084FF; left: -1px; top: -1px; pointer-events: none; z-index: 5;}
    }
    &.is-active:after{ border: 2px solid #0084FF; left: -2px; top: -2px;}
    // 工具
    .x-draggable-tools{
      position: absolute; right: 0; padding-left: 25px;
      &:before{ content: ''; position: absolute; left: 5px; top: 50%; transform: translate(0, -50%); border-radius: 50%; width: 5px; height: 5px; overflow: hidden; border: 3px solid #ccc; background-color: #fff;}
      .name{ background-color: #fff; padding: 5px 15px; border-radius: 40px; font-size: 14px; box-shadow: 0 0 5px rgba(0,0,0,.1); cursor: pointer;}
    }

    // 工具栏出现的位置
    &.is-center {
      .x-draggable-tools{ top: 50%; transform: translate3d(100%, -50%, 0);}
    }
    &.is-top {
      .x-draggable-tools{ top: 0; transform: translate3d(100%, 0, 0);}
    }
  }
</style>
