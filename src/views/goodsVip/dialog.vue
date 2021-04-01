<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="diaInfo.isShow"
    >
      <el-form label-width="80px"
               :model="memberList"
               ref="memb"
               :rules="rules">
        <el-form-item label='手机号' prop="phone">
          <el-input v-model="memberList.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='昵称' prop="nickname">
          <el-input v-model="memberList.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='密码' prop="password">
          <el-input v-model="memberList.password" autocomplete="off"></el-input>
          <h5>留空则不修改</h5>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="memberList.status"
            :active-value = '1'
            :inactive-value = '2'
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"   @click="editsubmit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { memberInfo,memberEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        memberList: {
          nickname:'',
          password:'',
          phone:'',
          status: 1
        },//初始数据
        rules : {
          nickname: [
            { required: true,message:'请输入正确的会员名称',trigger: 'blur'},
            { min: 2,max: 8,message: '长度在2到8个字符',trigger: 'blur'}
          ],
          password: [
            { required: true,message:'请输入正确的密码',trigger: 'blur'},
            { min: 2,max: 8,message: '长度在2到8个字符',trigger: 'blur'}
          ],
          phone: [
            { required: true,message:'请输入正确的手机号',trigger: 'blur'},
            { min: 11,max: 11,message: '长度11个字符',trigger: 'blur'}
          ]
        }, //必填项验证规则
      }
    },
    props: ['diaInfo'],
    methods: {
      ...mapActions({
        getmemberlist:'member/getMemberListAction',
      }),
      cancel() {
        this.$emit('cancel', false)
        this.reset()
      },
      reset(){
        this.memberList =  {
          nickname:'',
          password:'',
          phone:'',
          status: 1
        }
        //重置规则验证
        this.$refs.memb.resetFields()
      },
      editsubmit(){
        this.$refs.memberInfo.validate((valid) => {
          if (valid) {
            memberEdit(this.memberList)
              .then(res=>{
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this. getmemberlist()
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
      memberlistInfo(uid){
        memberInfo({uid})
          .then(res=>{
            if (res.data.code === 200){
              this.memberList = res.data.list
              this.memberList.password = ''
              this.memberList.uid = uid
            }else{
              this.$message.error(res.data.msg)
            }
          })
      }//获取一条信息
    }

  }
</script>

<style scoped>

</style>
