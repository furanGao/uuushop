<template>
  <div>
    <el-table
      :data="secklist"
      border
      style="width:100%">
      <el-table-column prop="title" label="活动名称"></el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" class="add" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" class="add" size="small" @click="del(item.row.id)" >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  import { seckDelete } from "../../util/axios";
  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
        secklist:'seck/getsecklist',
      })
    },
    mounted() {
      this.getsecklist()
    },
    methods:{
      ...mapActions({
        getsecklist : 'seck/getSeckListAction',
      }),
      del(id){
        //删除的时候弹出提示框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除接口,吧id传入
          seckDelete({id})
            .then(res=>{
              if (res.data.code === 200){
                this.getsecklist()
                this.$message.success(res.data.msg);
              }else {
                this.$message.error(res.data.msg)
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      edit(id){
        this.$emit('ediShow',id)
      },
    }
  }
</script>

<style scoped>

</style>
