<template>
  <div class="x-product" :class="{ 'is-single': single }">
    <div class="_pic">
      <div v-if="sign.enable" class="_sign">
        <img :src="sign.value" />
      </div>
      <img :src="formatCdn(detail.productPic)" />
    </div>
    <div class="_info">
      <div class="top">
        <div v-if="detail.productName" class="_title">{{ detail.productName }}</div>
      </div>

      <div class="bottom">
        <div class="_price">
          <div class="_left flex">
            <div class="_new">￥{{ detail.saleAmount }}</div>
            <div v-if="detail.saleAmount < detail.actualAmount" class="_old">￥{{ detail.actualAmount }}</div>
          </div>
          <div class="_right">
            <div v-if="buying.enable && [1, 2, 3, 4, 5].includes(buying.value)" class="_buying-rt-bx">
              <div v-if="buying.value === 1" class="_buying style-1">
                <i class="x-icon icon-019" />
              </div>
              <div v-else-if="buying.value === 2" class="_buying style-2">
                <i class="x-icon icon-020" />
              </div>
              <div v-else-if="buying.value === 3" class="_buying style-3">
                <i class="x-icon icon-022" />
              </div>
              <div v-else-if="buying.value === 4" class="_buying style-4"> 马上抢 </div>
              <div v-else-if="buying.value === 5" class="_buying style-5"> 马上抢 </div>
            </div>
          </div>
        </div>
        <div v-if="buying.enable && [6, 7, 8].includes(buying.value)" class="_buying-bt-bx">
          <div v-if="buying.value === 6" class="_buying">
            <i class="x-icon icon-021" />
            <span class="text">点击购买</span>
          </div>
          <div v-else-if="buying.value === 7" class="_buying">
            <i class="x-icon icon-037" />
            <span class="text">立即购买</span>
          </div>
          <div v-else-if="buying.value === 8" class="_buying">
            <i class="x-icon icon-024" />
            <span class="text">立即购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { formatCdn } from '@/utils'

  export default defineComponent({
    name: 'PProduct',
    components: {},
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      sign: {
        type: Object,
        default: () => {}
      },
      buying: {
        type: Object,
        default: () => {}
      },
      single: {
        type: Boolean,
        default: false
      }
    },
    setup($props) {
      const $state = reactive({
        ...toRefs($props)
      })

      return {
        ...toRefs($state),
        formatCdn
      }
    }
  })
</script>

<style lang="scss" scoped>
  .x-product {
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    ._pic {
      position: relative;
      height: 175px;
      ._sign {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 37px;
        height: 37px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    ._info {
      background-color: #fff;
      padding: 8px;
      color: #fd3d37;
    }
    ._title {
      font-size: 14px;
      color: #333333;
      overflow: hidden;
      height: 40px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    ._rebate {
      display: inline-block;
      border: 1px solid #fd3d37;
      border-radius: 1px;
      min-height: 19px;
      dl {
        display: flex;
        align-items: center;
        font-size: 10px;
        height: 100%;
      }
      dt {
        min-width: 18px;
        text-align: center;
        color: #fff;
        background-color: #fd3d37;
      }
      dd {
        flex: 1;
        padding: 0 5px;
      }
    }
    ._price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 5px;
      ._new {
        font-size: 14px;
        font-weight: bold;
      }
      ._old {
        font-size: 12px;
        padding-left: 5px;
        text-decoration: line-through;
        color: #999;
      }
      ._buying-rt-bx {
        text-align: center;
        ._buying {
          display: inline-block;
          color: #fd3d37;

          &.style-1,
          &.style-2,
          &.style-3 {
            .x-icon {
              font-size: 25px;
              line-height: normal;
            }
          }
          &.style-4 {
            padding: 4px 12px;
            color: #ffffff;
            border-radius: 30px;
            background: #fd3d37;
          }
          &.style-5 {
            padding: 4px 12px;
            border-radius: 4px;
            border: 1px solid;
            background: #ffffff;
          }
        }
      }
    }
    ._sales {
      font-size: 12px;
      color: #a4a4a4;
    }
    &.is-single {
      display: flex;
      align-items: center;
      ._pic {
        width: 120px;
        height: 120px;
      }
      ._info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 120px;
        flex: 1;
        padding: 5px 8px;

        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;

          ._price {
            flex: 1;
          }
        }
      }
      ._title {
        margin-bottom: 0;
      }
      ._rebate {
        transform: scale(0.8);
        transform-origin: 0 50%;
        margin-bottom: 5px;
      }
      ._buying-bt-bx {
        margin: 0;
      }
    }

    ._buying-bt-bx {
      margin: 10px 0 0;
      text-align: center;
      ._buying {
        display: inline-block;
        padding: 4px 12px;
        background: #fd3d37;
        color: #ffffff;
        border-radius: 30px;

        .text {
          margin-left: 3px;
        }
      }
    }
  }
</style>
