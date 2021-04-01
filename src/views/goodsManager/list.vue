<template>
  <div>
    <el-table
      :data="goodslist"
      border
      style="width:100%">
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <div >
            <img :src="$imgUrl+item.row.img" class="img" alt="" v-if="item.row.img !== '' ">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品"></el-table-column>
      <el-table-column prop="ishot" label="是否热卖"></el-table-column>
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
      :page-size="goodssize"
      :total="goodscount">
    </el-pagination>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  import { goodsDelete } from "../../util/axios";
  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
        goodslist:'goods/getgoodslist',
        goodscount:'goods/getgoodscount',
        goodssize:'goods/getgoodssize'
      })
    },
    mounted() {
      this.getgoodslist()
      this.getgoodscount()
    },
    methods:{
      ...mapActions({
        getgoodslist : 'goods/getGoodsListAction',
        getgoodscount: 'goods/getGoodsCountAction',
        getChangePages:'goods/getChangePage'
      }),
      del(id){
        //删除的时候弹出提示框
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除接口,吧id传入
          goodsDelete({id})
            .then(res=>{
              if (res.data.code === 200){
                this.getgoodslist()
                this.getgoodscount()
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
  img{
    width:120px;
    height: 120px
  }
</style>
