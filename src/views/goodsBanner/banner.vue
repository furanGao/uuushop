<template>
  <div>
    <crumb></crumb>
    <el-button type="primary"
               class="add"
               plain
               @click="add">添加</el-button>
    <v-list @ediShow="ediShow"></v-list>
    <v-diglog  :digInfo="digInfo" @cancel="cancel" ref="editDig"></v-diglog>
  </div>
</template>

<script>
  import vList from "./list";
  import vDiglog from "./dialog";
  export default {
    // name: "menu"
    data() {
      return {
        digInfo:{
          isShow : false,
          isAdd: false
        }
      }
    },
    methods: {
      add(){
        this.digInfo.isShow = true
        this.digInfo.isAdd = true
      },//添加按钮点击时触发
      cancel(e){
        this.digInfo.isShow = e
      },//父子组件传值 diglog取消按钮点击
      ediShow(e){
        this.digInfo.isShow = true
        this.digInfo.isAdd = false
        this.$refs.editDig.getbannerInfo(e)
      }//编辑显示diglog
    },
    components: {
      vList,vDiglog
    }
  }
</script>

<style scoped>
  .add{
    margin: 30px 0 20px 0;
  }
</style>

