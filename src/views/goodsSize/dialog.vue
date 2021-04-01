<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加商品规格':'编辑商品商品规格'"
      :visible.sync="digInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form label-width="80px"
               :model="specsList"
               ref="userInfoo"
               :rules="rules">
        <el-form-item label='商品规格' prop="specsname">
          <el-input  autocomplete="off" v-model="specsList.specsname"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in domains"
          label="规格属性"
          :key="index"
        >
          <el-input v-model="item.value" style="width: 270px"></el-input>
          <el-button @click="addDomain" type="primary" v-if="index === 0">新增域名</el-button>
          <el-button @click="delDomain(item)" type="danger" v-else >删 除</el-button>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="specsList.status"
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
  import { specsAdd,specsInfo,specsEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        specsList: {
          specsname:'',
          status:1,
          attrs:''
        },//初始数据
        rules : {
          specsname : [
            { required: true,message:'请输入正确的菜单名称',trigger: 'blur'},
            { min: 2,max: 15,message: '长度在2到15个字符',trigger: 'blur'}
          ]
        }, //必填项验证规则
        domains: [{
            value: ''
          }]
      }
    },
    props : ['digInfo'],
    methods: {
      ...mapActions({
        getlist:'specs/getSpecsListAction',
        getspecscount:'specs/getSpecsCountAction'
      }),
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },
      reset(){
        this.specsList = {
          specsname:'',
          status:1,
          attrs:''
        }
        this.$refs.userInfoo.resetFields()//清空验证
        this.domains = [{
          value: ''
        }]
      },
      submit(){
        this.$refs.userInfoo.validate((valid) => {
          if (valid) {
            var attrlist = this.domains.map(item=>item.value)
            this.specsList.attrs = attrlist.join(',')
            specsAdd(this.specsList)
              .then(res =>{
                console.log(res)
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this.getlist()
                  this.getspecscount()
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
      getspecsinfo(id){
        specsInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              let arr = []
              res.data.list[0].attrs.forEach(item=>{
                arr.push({
                  value: item
                })
              })
              this.domains = arr
              this.specsList = res.data.list[0]
              this.specsList.id = id
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.userInfoo.validate((valid) => {
          if (valid) {
            var attrlist = this.domains.map(item=>item.value)
            this.specsList.attrs = attrlist.join(',')
            specsEdit(this.specsList)
              .then(res =>{
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
      },//编辑保存下来
      addDomain() {
        this.domains.push({
          value: ''
        });
      },//新增规则属性
      delDomain(item) {
        var index = this.domains.indexOf(item);
        if (index !== -1) {
          this.domains.splice(index, 1);
        }
      }//删除规则属性

    },
    computed:{
      ...mapGetters({
        roleList : 'specs/getspecslist'
      })
    },
    mounted() {
      this.getlist()
    }
  }
</script>

<style scoped>

</style>
