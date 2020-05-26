<template>
  <section class="x-application-layout">
    <section class="x-application-header">
      <div class="back" @click="onBack">
        <i class="el-icon-arrow-left" />
        <span>返回</span>
      </div>
      <div class="tools">
        <el-button @click="onSave">保存</el-button>
        <el-button type="primary">上架</el-button>
      </div>
    </section>
    <section class="x-application-main">
      <router-view :key="key"/>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XApplicationLayout',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      page: state => state.application.page
    }),
    key () {
      return this.$route.path
    }
  },
  watch: {},
  created () {

  },
  methods: {
    onBack () {
      this.$router.back()
    },
    onSave () {
      console.log(this.page)
    }
  }
}
</script>

<style lang="less">
  .x-application-layout {
    display: flex; box-orient: vertical; flex-direction: column; height: 100%;
    ul,li,ol,dl,dt,dd,em{ font-style: normal; list-style: none; margin: 0; padding: 0;}
    .x-application-header{
      height: 70px; padding: 0 30px; display: flex; align-items: center; box-shadow: 0 0 10px rgba(0,0,0,1);
      .back{ font-size: 14px; cursor: pointer;}
      .tools{ flex: 1; text-align: right;}
    }
    .x-application-main{
      flex: 1; background-color: #F3F6F8; overflow: hidden;
    }
  }
</style>
