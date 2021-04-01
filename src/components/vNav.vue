<template>
  <div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      router
      :default-active="path"
      unique-opened
      active-text-color="#ffd04b">
      <el-menu-item index="/home" >
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">{{menu.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
      }
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      path(){
        return this.$route.path
      }
    }
  }
</script>

<style scoped lang="stylus">
  .el-menu
    height 90vh
</style>
