<template>
  <div :class="className">
    <div v-if="detail.mainPic" class="pic">
      <el-image :src="detail.imgUrl" fit="cover" />
    </div>
    <el-form ref="form" :model="detail" size="mini" label-width="5em" label-position="right">
      <el-form-item v-if="detail.title" label="标题">
        <el-input v-model="detail.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-if="detail.subTitle" label="副标题">
        <el-input v-model="detail.subTitle" placeholder="请输入副标题" />
      </el-form-item>
      <el-form-item v-if="linkType && detail.linkType" label="类型">
        <el-select v-model="detail.linkType" placeholder="请选择">
          <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isLanding" label="落地">
        <el-input v-if="detail.linkType === 2" v-model="detail.productId" placeholder="请输入或选择商品ID">
          <el-button slot="append">选择商品</el-button>
        </el-input>
        <el-select v-else-if="detail.linkType === 1 || isLanding" v-model="detail.linkPageId" placeholder="请选择落地页面">
          <el-option v-for="(item, index) in linkType" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="goods" label="选择商品">
        <el-button type="primary" plain @click="onAddGoods">添加商品</el-button>
      </el-form-item>
      <div v-if="detail.productList && detail.productList.length" class="goods-list">
        <vue-draggable v-model="detail.productList" class="list">
          <div v-for="(item, index) in detail.productList" :key="index" class="item">
            <el-image :src="item.mainPic" />
            <div class="x-icon icon-018" @click="onRemoveGoods(index)" />
          </div>
        </vue-draggable>
      </div>
    </el-form>
    <div class="tools">
      <el-tooltip content="拖动模块进行排序">
        <div class="move">
          <i class="x-icon icon-013" />
        </div>
      </el-tooltip>
      <el-tooltip v-if="del" content="点击删除">
        <div class="del" @click="onDelete">
          <i class="x-icon icon-018" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import VueDraggable from 'vuedraggable'

export default {
  name: 'XPanelItem',
  components: {
    VueDraggable
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    // 模块类型名称
    use: {
      type: String,
      default: ''
    },
    detail: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    // 是否可以删除子模块
    del: {
      type: Boolean,
      default: true
    },
    // 子模块是否可以移动
    move: {
      type: Boolean,
      default: true
    },
    // 是否展示商品选择功能
    goods: {
      type: Boolean,
      default: false
    },
    // 落地类型是否可以更改
    linkType: {
      type: Boolean,
      default: true
    },
    // 是否显示常规落地选择
    landing: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      linkTypeList: [{
        name: '页面',
        value: 1
      }, {
        name: '商品',
        value: 2
      }]
    }
  },
  computed: {
    className () {
      const arr = ['x-panel-item']
      arr.push(`is-${this.type}`)
      if (this.use) {
        arr.push(`is-${this.use}`)
      }
      if (this.move) {
        arr.push('is-move')
      }
      return arr.join(' ')
    },
    // 落地是否可配置，有落地值、魔方模块
    isLanding () {
      return this.landing && (this.detail.productId || this.detail.linkPageId || ['cube'].some(item => item === this.use))
    }
  },
  watch: {},
  created () {

  },
  methods: {
    onDelete () {
      this.$emit('delete', this.index, this.detail)
    },
    // 移除商品
    onRemoveGoods (index) {
      this.detail.productList.splice(index, 1)
    },
    // 添加商品
    onAddGoods () {
      this.detail.productList.push({
        retailPrice: 10,
        earningPrice: 1,
        mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
      })
    }
  }
}
</script>

<style lang="less">
  .x-panel-item{
    display: flex; align-items: center; background-color: #fff; padding: 10px; margin-bottom: 10px; position: relative;
    &.is-move{
      .tools .move{ display: block;}
      &:hover{ cursor: move;}
    }
    &:hover{
      .tools{
        .del{ display: block;}
      }
    }
    .pic{
      width: 90px; height: 90px; background-color: #fff; display: flex; align-items: center; border: 1px solid #E5E5E5; border-radius: 5px; overflow: hidden; cursor: default;
      .el-image{ width: 100%; height: 100%;}
    }
    .el-form{
      flex: 1; width: 100%;
      .el-input__inner{ padding-left: 10px;}
      .el-select{ width: 100%; }
    }
    .tools{
      position: absolute; left: 0; top: 0; cursor: pointer;
      .move{ display: none; position: absolute; left: 3px; top: 3px; color: #DCDCDC;}
      .del{ display: none; position: absolute; left: -5px; top: -5px; background-color: rgba(149,149,149, .8); color: #fff; padding: 5px; border-radius: 50%;}
    }
    .goods-list{
      display: flex; align-items: center; flex-wrap: wrap; max-height: 189px; overflow: auto;
      .list{ display: flex; align-items: center; flex-wrap: wrap;}
      .add{
        .item{
          border: 1px solid #0084FF; color: #0084FF;cursor: pointer; box-orient: vertical; flex-direction: column; font-size: 12px; padding-top: 10px;
          span{ display: block; text-align: center;}
        }
      }
      .item{
        width: 58px; height: 58px; margin: 0 5px 5px 0; display: flex; align-items: center; text-align: center; background-color: #F3F6F8; cursor: move;
        &:hover{
          position: relative; z-index: 9;
          .el-image{ opacity: .4;}
          .icon-018{ position: absolute; font-size: 10px; display: block; right: 3px; top: 3px; background-color: rgba(0,0,0,.5); color: #fff; line-height: 1; padding: 5px; border-radius: 50%; cursor: pointer;}
        }
        .icon-018{ display: none;}
      }
    }

    &.is-tag{
      .tools{ right: 0; left: auto;}
      .move{ left: auto; right: 3px;}
      .del{ left: auto; right: -5px;}
    }
    &.is-cube{
      display: flex; box-orient: vertical; flex-direction: column;
      .pic{ width: 100%; margin-bottom: 20px;}
    }
  }
</style>
