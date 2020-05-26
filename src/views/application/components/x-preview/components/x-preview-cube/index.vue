<template>
  <div class="x-preview-cube" :style="{'margin-bottom': `${styles.marginBottom || 0}px`}">
    <div class="content" :style="background">
      <div class="header">
        <div class="name">{{ content.title }}</div>
        <div class="more">
          <span>{{ content.subTitle }}</span>
          <i class="el-icon-d-arrow-right" />
        </div>
      </div>
      <div class="goods">
        <ul>
          <li v-for="(item, index) in content.productList" :key="index">
            <div class="item">
              <div class="pic">
                <el-image :src="item.mainPic" />
              </div>
              <div class="info">
                <div class="rebate">
                  <dl>
                    <dt>返</dt>
                    <dd>￥1.00</dd>
                  </dl>
                </div>
                <div class="price">
                  <div class="new">￥10</div>
                  <div class="old">￥19</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XPreviewCube',
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
  computed: {
    content () {
      return this.detail.componentContentList[0]
    },
    background () {
      return {
        'background-image': `url(${this.content.imgUrl})`
      }
    },
    // 模块样式
    styles () {
      return this.detail.componentStyle || {}
    }
  },
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="less">
  .x-preview-cube{
    padding: 0 10px;
    .content{
      background-color: #fff; background-repeat: no-repeat; background-size: cover; border-radius: 5px; overflow: hidden;
      .header{
        padding: 10px; color: #fff; display: flex; align-items: center;
        .name{ font-size: 19px; font-weight: bold; flex: 1;}
        .more{ display: flex; align-items: center; font-size: 12px;}
      }
      .goods{
        padding: 0 10px 10px; overflow: hidden;
        ul{overflow: auto; display: flex; flex-shrink: 0; min-height: 161px;}
        li{
          padding: 0 3px;
          &:first-child{ padding: 0;}
        }
        .item{
          background-color: #fff; box-shadow: 0 0 5px rgba(0, 0, 0, .1); border-radius: 5px; overflow: hidden;
          .pic{ width: 100px; height: 100px;}
          .info{ background-color: #fff; padding: 8px; color: #FD3D37;}
          .rebate{
            display: inline-block; border: 1px solid #FD3D37; border-radius: 1px;
            dl{ display: flex; align-items: center; font-size: 10px;}
            dt{ min-width: 18px; text-align: center; color: #fff; background-color: #FD3D37;}
            dd{ flex: 1; padding: 0 5px;}
          }
          .price{
            display: flex; align-items: center; padding-top: 5px;
            .new{ font-size: 14px;font-weight: bold;}
            .old{ flex: 1; font-size: 12px; padding-left: 5px; text-decoration: line-through;}
          }
        }
      }
    }
  }
</style>
