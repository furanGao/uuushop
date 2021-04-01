<template>
  <div>
    <crumb></crumb>
    <el-button type="primary"
               class="add"
               @click="add"
               plain>添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-dialog :diaInfo="diaInfo" @cancel="cancel" ref="editlist"></v-dialog >
  </div>
</template>
<script>
  import vList from "./list";
  import vDialog from "./dialog";
  export default {
    // name: "menu"
    data() {
      return {
        diaInfo:{
          isShow : false,
          isAdd: false
        }
      }
    },
    methods: {
      add(){
        this.diaInfo.isShow = true
        this.diaInfo.isAdd = true
      },
      cancel(){
        this.diaInfo.isShow = false
      },
      edit(e){
        this.diaInfo.isShow = true
        this.diaInfo.isAdd = false
        this.$refs.editlist. rolelistInfo(e)
      }
    },
    components: {
      vList,vDialog
    }
  }
</script>

<style scoped>
  .add{
    margin: 30px 0 20px 0;
  }
</style>
