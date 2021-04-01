<template>
  <div>
    <!--:before-close  关闭前回调，会暂停dialog的关闭 -->
    <!--:visible.sync  控制显示和隐藏-->
    <el-dialog
      :title="digInfo.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="digInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form label-width="80px"
               :model="menuList"
               ref="menuInfo"
               :rules="rules">
        <el-form-item label='菜单名称' prop="title">
          <el-input v-model="menuList.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" v-model="menuList.title">
          <el-select  placeholder="请选择" v-model="menuList.pid">
            <el-option  :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in OPmenuList"
              :label="item.title"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" >
          <el-radio v-model="menuList.type" :label="1">目录</el-radio>
          <el-radio v-model="menuList.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="menuList.type === 1">
          <el-select v-model="menuList.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" >
          <el-select v-model="menuList.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="menuList.status"
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
  import { menuAdd,menuInfo,menuEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  import { indexRoutes } from "../../router";
    export default {
      data(){
        return {
          menuList: {
            pid: 0,
            title: '',
            icon: '',
            type: 1,
            url: '',
            status: 1
          },//初始数据
          rules : {
            title : [
              { required: true,message:'请输入正确的菜单名称',trigger: 'blur'},
              { min: 2,max: 8,message: '长度在2到8个字符',trigger: 'blur'}
            ],
            pid : [
              { required: true,message: '请选择上级菜单',trigger: 'change'},
            ]
          }, //必填项验证规则
          iconList: [
            "el-icon-s-tools",
            "el-icon-setting",
            "el-icon-s-goods",
            "el-icon-goods"
          ],
          indexRoutes:indexRoutes
        }
      },
      props : ['digInfo'],
      methods: {
        ...mapActions({
          getlist:'menu/getMenuListAction'
        }),
        cancel(){
          //取消按钮
          this.$emit('cancel',false)
          this.reset()
          },
        reset(){
          this.menuList = {
            pid: 0,
            title: '',
            icon: '',
            type: 1,
            url: '',
            status: 1
          }
          this.$refs.menuInfo.resetFields()//清空验证
        },
        submit(){
          this.$refs.menuInfo.validate((valid) => {
            if (valid) {
                menuAdd(this.menuList)
                .then(res =>{
                  console.log(res)
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
        },
        getmenuInfo(id){
          menuInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              this.menuList = res.data.list
              this.menuList.id = id
            }
          })
        },//读取一条详细信息，进行渲染
        editsubmit(){
          this.$refs.menuInfo.validate((valid) => {
            if (valid) {
              menuEdit(this.menuList)
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
          'OPmenuList' : 'menu/getmenulist'
        })
      }
    }
</script>

<style scoped>

</style>
