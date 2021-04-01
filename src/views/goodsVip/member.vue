<template>
  <div>
    <crumb></crumb>
    <v-list @edit="edit"></v-list>
    <v-dialog :diaInfo="diaInfo" @cancel="cancel" ref="editlist"></v-dialog >
  </div>
</template>
<script>
  import vList from "./list";
  import vDialog from "./dialog";
  export default {
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
        this.$refs.editlist.memberlistInfo(e)
      }
    },
    components: {
      vList,vDialog
    }
  }
</script>

