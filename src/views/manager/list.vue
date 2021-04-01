<template>
  <div>
    <el-table
      :data="userlist"
      border
      style="width:100%">
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
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
            <el-button type="primary" class="add" size="small" @click="edit(item.row.uid)">编辑</el-button>
            <el-button type="danger" class="add" size="small" @click="del(item.row.uid)" >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-size="usersize"
      :total="usercount">
    </el-pagination>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  import { userDelete } from "../../util/axios";
  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
       userlist:'user/getuserlist',
       usercount:'user/getusercount',
       usersize:'user/getusersize'

      })
    },
    mounted() {
      this.getuserlist()
      this.getusercount()
    },
    methods:{
      ...mapActions({
        getuserlist : 'user/getUserListAction',
        getusercount: 'user/getUserCountAction',
        getChangePages:'user/getChangePage'
      }),
      del(uid){
        //删除的时候弹出提示框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除接口,吧id传入
          userDelete({uid})
            .then(res=>{
              if (res.data.code === 200){
                this.getuserlist()
                this.getusercount()
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
      currentChange(n){
        this.getChangePages(n)
      }
    }
  }
</script>

<style scoped>

</style>
