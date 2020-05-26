<template>
  <div class="x-application-aside">
    <div class="x-application-title">组件库</div>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="item in collapse" :key="item.name" :title="item.name" :name="item.name">
        <div class="components">
          <div v-for="label in item.list" :key="label.type" class="li">
            <div class="item">
              <div class="icon">
                <i class="x-icon" :class="label.icon" />
              </div>
              <div class="name">{{ label.name }}</div>
              <div class="limit">0/{{ label.limit }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'XApplicationAside',
  components: {},
  props: {},
  data () {
    return {
      activeNames: '基础组件',
      // 1-banner广告；2-商城标签；3-icon分类；4-魔方；5-图文导航；6-商品
      collapse: [{
        name: '基础组件',
        list: [{
          type: 1,
          name: 'Banner广告',
          icon: 'icon-009',
          limit: 1
        }, {
          type: 2,
          name: '商城标签',
          icon: 'icon-009',
          limit: 1
        }, {
          type: 3,
          name: 'ICON',
          icon: 'icon-009',
          limit: 1
        }, {
          type: 4,
          name: '魔方',
          icon: 'icon-009',
          limit: 1
        }, {
          type: 5,
          name: '图文导航',
          icon: 'icon-009',
          limit: 1
        }, {
          type: 6,
          name: '商品',
          icon: 'icon-009',
          limit: 1
        }]
      }]
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {}
}
</script>

<style lang="less">
  .x-application-aside{
    width: 190px; background-color: #fff;
    .el-collapse-item__header{ border-bottom: 0; padding-left: 15px;}
    .el-collapse-item__wrap{ border-bottom: 0;}
    .components{
      display: flex; flex-wrap: wrap; padding: 10px;
      .li{ width: 50%; text-align: center;}
      .item{
        display: inline-block; width: 80px; padding: 10px 0; border-radius: 5px; overflow: hidden; background-color: #fff; cursor: pointer;
        .x-icon{ font-size: 30px; line-height: 1;}
        .limit{ font-size: 12px; color: #999;}
        &:hover{
          background-color: #0084FF; color: #fff;
          .limit{ color: #fff;}
        }
      }
    }
  }
</style>
