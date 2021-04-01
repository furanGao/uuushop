<template>
  <div>
    <!--:before-close  关闭前回调，会暂停dialog的关闭 -->
    <!--:visible.sync  控制显示和隐藏-->
    <el-dialog
      :title="diaInfo.isAdd?'添加角色':'编辑角色'"
      :visible.sync="diaInfo.isShow"
    >
      <el-form label-width="80px"
               :model="roleList"
               ref="roleInfo"
               :rules="rules">
        <el-form-item label='角色名称' prop="rolename">
          <el-input v-model="roleList.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='角色权限'>
          <el-tree
            show-checkbox
            :data="menulist"
            node-key="id"
            ref="tree"
            :props="{
              children:'children',
              label: 'title'
            }"
            default-expand-all
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" >
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="roleList.status"
            :active-value = '1'
            :inactive-value = '2'
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"  v-if="diaInfo.isAdd" @click="submit">确 定</el-button>
        <el-button type="primary"  v-else @click="editsubmit">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { roleAdd,roleInfo,roleEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        roleList: {
          rolename:'',
          menus:'',
          status: 1
        },//初始数据
        rules : {
           rolename: [
            { required: true,message:'请输入正确的角色名称',trigger: 'blur'},
            { min: 2,max: 8,message: '长度在2到8个字符',trigger: 'blur'}
          ]
        }, //必填项验证规则
      }
    },
    mounted() {
      this.getmenulist()
    },
    props: ['diaInfo'],
    methods: {
      ...mapActions({
        getrolelist:'role/getMenuListAction',
        getmenulist : 'menu/getMenuListAction'
      }),
      cancel() {
        this.$emit('cancel', false)
        this.reset()
      },
      reset(){
        this.roleList = {
          rolename:'',
          menus:'',
          status: 1
        }
        //重置规则验证
        this.$refs.roleInfo.resetFields()
        //重置树型结构
        this.$refs.tree.setCheckedKeys([])
      },
      submit(){
        this.$refs.roleInfo.validate((valid) => {
          if (valid) {
            this.roleList.menus = this.$refs.tree.getCheckedKeys().join(',')
            // console.log(typeof this.roleList.menus)
            roleAdd(this.roleList)
              .then( res=>{
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this.getrolelist()
                }else{
                  this.$message.error(res.data.msg)
                }})
          }else {
            this.$message.error('验证失败')
            return false
          }
        });
      },
      editsubmit(){
        this.$refs.roleInfo.validate((valid) => {
          if (valid) {
            this.roleList.menus = this.$refs.tree.getCheckedKeys().join(',')
            // console.log(typeof this.roleList.menus)
            roleEdit(this.roleList)
              .then(res=>{
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this. getrolelist()
                }else{
                  this.$message.error(res.data.msg)
                }
              })
          }else {
            this.$message.error('验证失败')
            return false
          }
        });
      },
      rolelistInfo(id){
        roleInfo({id})
        .then(res=>{
          if (res.data.code === 200){
            this.roleList = res.data.list
            this.roleList.id = id
            this.$refs.tree.setCheckedKeys(this.roleList.menus.split(','))
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }//获取一条信息
      },
    computed:{
      ...mapGetters({
        'menulist':'menu/getmenulist'
      })
    }
  }
</script>

<style scoped>

</style>
