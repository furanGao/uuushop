<template>
  <div>
    <el-form  status-icon
              label-width="100px"
              :model="ruleList"
              :rules="rules"
              ref="ruleList"
    >
      <h1>小高系统登陆页面</h1>
      <el-form-item label="姓名" prop="username">
        <el-input type="text" v-model="ruleList.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleList.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="submit('ruleList')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import { userLogin } from "../util/axios";
  export default {
    data(){
      return {
        ruleList : {
          username :'',
          password :''
        },
        rules : {
          username : [
            { required : true,message:'请输入正确的姓名',trigger:'blur'},
            { min : 2,max : 8,message: '长度在2到8个字符',trigger:'blur'}
          ],
          password : [
            { required : true,message:'请输入正确的密码',trigger:'blur'},
            { min : 6,max : 12,message: '长度在6到12个字符',trigger:'blur'}
          ]
        } //表单验证规则
      }
    },
    beforeRouteLeave(to,from,next){
      if (sessionStorage.getItem('user') === null){
        next('/log')
        location.reload()
      }else{
        next()
      }
    },
    methods:{
      ...mapActions(['changeUserInfoAction']),
      submit(ruleList) {
        this.$refs[ruleList].validate((valid) => {
          if (valid) {
            userLogin(this.ruleList)
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.changeUserInfoAction(res.data.list)
                this.$router.push('/index')
              }else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error('错了哦，请重新输入');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

.el-form{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #7DB3FA;
  margin: auto;
  width: 60%;
  height: 45%;
  padding: 66px 55px 0 0 ;
  box-sizing: border-box;
  text-align: center;
}
.el-form h1{
  margin-bottom: 40px;
}
</style>
