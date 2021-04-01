<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加轮播图':'编辑轮播图'"
      :visible.sync="digInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form label-width="80px"
               :model="bannerlist"
               ref="bannerInfo"
               :rules="rules">
        <el-form-item label='标题' prop="title">
          <el-input v-model="bannerlist.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='图片'  prop="img">
          <el-upload
            action="#"
            :limit="1"
            :on-exceed="exceedImg"
            :on-change="changeImg"
            :file-list="fileList"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item label="状态" >
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="bannerlist.status"
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
  import { bannerAdd,bannerInfo,bannerEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        bannerlist: {
          img:'',
          title: '',
          status: 1
        },//初始数据
        dialogImageUrl: '',//预览时调用的图片地址
        dialogVisible: false,//控制图片预览时的显示和隐藏
        fileList:[],//用于图片回显
        imgUrl: "",
        rules : {
          title : [
            { required: true,message:'请输入正确的分类名称',trigger: 'blur'},
            { min: 2,max: 12,message: '长度在2到12个字符',trigger: 'blur'}
          ]
        }, //必填项验证规则
      }
    },
    props : ['digInfo'],
    methods: {
      ...mapActions({
        getlist:'banner/getbannerListAction'
      }),
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },//取消
      reset(){
        this.bannerlist={
          img:'',
          title: '',
          status: 1
        }
        this.$refs.bannerInfo.resetFields()//清空验证
        this.fileList = []
      },//重置
      submit(){
        this.$refs.bannerInfo.validate((valid) => {
            if (valid) {
              this.bannerlist.img = this.imgUrl;
               let file = new FormData()
               for (let i in this.bannerlist){
                file.append(i,this.bannerlist[i])
              }
              bannerAdd(file)
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
          }
        );
      },//提交
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },//移除时的钩子函数
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },//预览时的钩子函数
      changeImg(file){
        this.imgUrl = file.raw
        // console.log(file,'我是图片改变的钩子函数')
      },//图片改变的钩子函数
      exceedImg(file,fileList){
        this.$message.warning(`当前限制选择1个文件，本次选择了${file.length}个文件，共选择了
        ${file.length + fileList.length}个文件`)
      },//限制上传的钩子函数
      getbannerInfo(id){
        bannerInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              // res.data.list.img
              //判断回显的时候图片是否存在 存在进行拼接
              this.bannerlist = res.data.list
              this.fileList = this.bannerlist.img ? [{
                url:this.$imgUrl + this.bannerlist.img
              }] : []
              this.bannerlist.img = this.fileList
              this.bannerlist.id = id
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.bannerInfo.validate((valid) => {
          if (valid) {
            this.bannerlist.img = this.imgUrl ? this.imgUrl : this.bannerlist.img
              let file = new FormData()
              for (let i in this.bannerlist){
                file.append(i,this.bannerlist[i])
              }
            bannerEdit(file)
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
      }//编辑保存下来
    },
    computed:{
      ...mapGetters({
        OPbannerlist : 'banner/getbannerlist'
      })
    }
  }
</script>

<style scoped>

</style>
