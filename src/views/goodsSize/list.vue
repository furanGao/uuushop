<template>
  <div>
    <el-table
      :data="specslist"
      border
      style="width:100%">
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag type="info" v-for="i in item.row.attrs" :key="item.row.attrs.id" style="margin:0 4px">{{i}}</el-tag>
          </div>
        </template>
      </el-table-column>
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
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-size="specssize"
      :total="specscount">
    </el-pagination>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  import { specsDelete } from "../../util/axios";
  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
        specslist:'specs/getspecslist',
        specscount:'specs/getspecscount',
        specssize:'specs/getspecssize'

      })
    },
    mounted() {
      this.getspecslist()
      this.getspecscount()
    },
    methods:{
      ...mapActions({
        getspecslist : 'specs/getSpecsListAction',
        getspecscount: 'specs/getSpecsCountAction',
        getChangePages:'specs/getChangePage'
      }),
      del(id){
        //删除的时候弹出提示框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除接口,吧id传入
          specsDelete({id})
            .then(res=>{
              if (res.data.code === 200){
                this.getspecslist()
                this.getspecscount()
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
