<template>
  <div>
    <el-table
      :data="menulist"
      border
      row-key="id"
      :tree-props="{children: 'children'}"
      style="width:100%">
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="item">
          <div>
            <i :class="item.row.icon"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
    import { menuDelete } from "../../util/axios";
    export default {
      data(){
        return {
        }
      },
      computed:{
        ...mapGetters({
          menulist:'menu/getmenulist'
        })
      },
      mounted() {
        this.getmenulist()
      },
      methods:{
        ...mapActions({
          getmenulist : 'menu/getMenuListAction'
        }),
        del(id){
          //删除的时候弹出提示框
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //调用删除接口,吧id传入
            menuDelete({id})
            .then(res=>{
              if (res.data.code === 200){
                this.getmenulist()
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
        }
      }
    }
</script>

<style scoped>

</style>
