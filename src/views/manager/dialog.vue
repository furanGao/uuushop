<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="digInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form label-width="80px"
               :model="userList"
               ref="userInfo"
               :rules="rules">
        <el-form-item label="所属角色" prop="roleid">
        <el-select  placeholder="请选择" v-model="userList.roleid">
          <el-option
            v-for="item in roleList"
            :label="item.rolename"
            :key="item.id"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label='用户名称' prop="username">
          <el-input  autocomplete="off" v-model="userList.username"></el-input>
        </el-form-item>
        <el-form-item  label="密码" >
          <el-input v-model="userList.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch
            v-model="userList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value = '1'
            :inactive-value = '2'
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" v-if="digInfo.isAdd">确 定</el-button>
        <el-button type="primary" @click="editsubmit" v-else>编 辑</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { userAdd,userInfo,userEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        userList: {
          roleid:'',
          username:'',
          password:'',
          status:1
        },//初始数据
        rules : {
          username : [
            { required: true,message:'请输入正确的菜单名称',trigger: 'blur'},
            { min: 2,max: 15,message: '长度在2到15个字符',trigger: 'blur'}
          ],
          roleid : [
            { required: true,message: '请选择上级菜单',trigger: 'change'},
          ]
        }, //必填项验证规则
      }
    },
    props : ['digInfo'],
    methods: {
      ...mapActions({
        getlist:'user/getUserListAction',
        getroleList:'role/getMenuListAction',
        getusercount: 'user/getUserCountAction',
      }),
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },
      reset(){
        this.userList = {
          roleid:'',
          username:'',
          password:'',
          status:1
        }
        this.$refs.userInfo.resetFields()//清空验证
      },
      submit(){
        this.$refs.userInfo.validate((valid) => {
          if (valid) {console.log(this.userList)
            userAdd(this.userList)
              .then(res =>{
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this.getlist()
                  this.getusercount()
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
      getmenuInfo(uid){
        userInfo({uid})
          .then(res=>{
            if (res.data.code === 200) {
              this.userList = res.data.list
              this.userList.uid = uid
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            userEdit(this.userList)
              .then(res =>{
                // console.log(this.menuList)
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this.getlist()
                }else{
                  this.$message.error(res.data.msg)
                }
              })
          }else {
            this.$message.error('验证失败')
            return false
          }
        });
      }//编辑保存下来
    },
    computed:{
      ...mapGetters({
        roleList : 'role/getrolelist'
      })
    }
  }
</script>

<style scoped>

</style>
