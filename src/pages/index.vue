<template>
  <div>
    <el-container>
      <el-header>
       <h1>小高后台管理系统</h1>
        <div>
          <span>{{getUserInfo.username}}</span>
          <el-button @click="logout" type="danger" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import vNav from "../components/vNav";
    import {mapGetters,mapActions} from 'vuex'
    export default {
      name: "index",
      components: {
          vNav
      },
      methods:{
        ...mapActions(['changeUserInfoAction']),
        logout(){
          this.changeUserInfoAction(false)
          this.$router.replace('/log')
        }
      },
      computed:{
        ...mapGetters(['getUserInfo'])
      }
    }
</script>

<style scoped lang="stylus">
.el-header
  background rgba(184, 173, 173, 0.82)
  text-align center
  height 10vh !important
  display flex
  /*padding 0 100px */
  justify-content space-between
  h1
    line-height 10vh
    font-size 36px
  div
    display flex
    align-items center
    span
      display inline-block
      padding-right 10px
.el-aside
  width 260px !important
</style>
