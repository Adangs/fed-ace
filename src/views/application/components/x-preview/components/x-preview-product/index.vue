<template>
  <div class="x-preview-product">
    <div class="_pic">
      <el-image :src="detail.mainPic" />
    </div>
    <div class="_info">
      <div class="_title">{{ detail.productName }}</div>
      <div class="_rebate">
        <dl>
          <dt>返</dt>
          <dd>￥1.00</dd>
        </dl>
      </div>
      <div class="_price">
        <div class="_new">￥10</div>
        <div class="_old">￥19</div>
        <div class="_sales">1.8万人已拼</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XPreviewProduct',
  components: {},
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="less">
  .x-preview-product{
    border-radius: 5px; overflow: hidden;
    ._info{ background-color: #fff; padding: 8px; color: #FD3D37;}
    ._title{ font-size: 14px; color: #333333; margin-bottom: 20px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
    ._rebate{
      display: inline-block; border: 1px solid #FD3D37; border-radius: 1px;
      dl{ display: flex; align-items: center; font-size: 10px;}
      dt{ min-width: 18px; text-align: center; color: #fff; background-color: #FD3D37;}
      dd{ flex: 1; padding: 0 5px;}
    }
    ._price{
      display: flex; align-items: center; padding-top: 5px;
      ._new{ font-size: 14px;font-weight: bold;}
      ._old{ flex: 1; font-size: 12px; padding-left: 5px; text-decoration: line-through;}
      ._sales{ font-size: 12px; color: #A4A4A4;}
    }
  }
</style>
