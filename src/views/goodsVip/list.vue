<template>
  <div>
    <el-table
      :data="memberlist"
      style="width:100%">
      <el-table-column prop="uid" label="会员编号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  import {memberDelete} from "../../util/axios";

  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
        memberlist:'member/getmemberlist'
      })
    },
    mounted() {
      this.getmemberlist()
    },
    methods:{
      ...mapActions({
        getmemberlist:'member/getMemberListAction'
      }),
      edit(uid){
        this.$emit('edit',uid)
      }
    }
  }
</script>

<style scoped>

</style>

