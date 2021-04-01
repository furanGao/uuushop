<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加商品分类':'编辑商品分类'"
      :visible.sync="digInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form label-width="80px"
               :model="catelist"
               ref="cateInfo"
               :rules="rules">
        <el-form-item label="上级分类" prop="pid">
          <el-select  placeholder="请选择" v-model="catelist.pid">
            <el-option  :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in OPcatelist"
              :label="item.catename"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='分类名称' prop="catename">
          <el-input v-model="catelist.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='图片' v-if="catelist.pid !== 0" prop="img">
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
            v-model="catelist.status"
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
  import { cateAdd,cateInfo,cateEdit } from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        catelist: {
          pid:0,
          img:'',
          catename: '',
          status: 1
        },//初始数据
        dialogImageUrl: '',//预览时调用的图片地址
        dialogVisible: false,//控制图片预览时的显示和隐藏
        fileList:[],//用于图片回显
        imgUrl: "",
        rules : {
          catename : [
            { required: true,message:'请输入正确的分类名称',trigger: 'blur'},
            { min: 2,max: 12,message: '长度在2到12个字符',trigger: 'blur'}
          ],
          pid : [
            { required: true,message: '请选择上级分类',trigger: 'change'},
          ]
        }, //必填项验证规则
      }
    },
    props : ['digInfo'],
    methods: {
      ...mapActions({
        getlist:'cate/getCateListAction'
      }),
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },//取消
      reset(){
        this.catelist={
            pid:0,
            img:'',
            catename: '',
            status: 1
        }
        this.$refs.cateInfo.resetFields()//清空验证
        this.fileList = []
      },//重置
      submit(){
        this.$refs.cateInfo.validate((valid) => {
          if (valid) {
            this.catelist.img = this.imgUrl;
            let file = new FormData()
            for (let i in this.catelist){
              file.append(i,this.catelist[i])
            }
            cateAdd(file)
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
      getcateInfo(id){
        cateInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              // res.data.list.img
              //判断回显的时候图片是否存在 存在进行拼接
              this.catelist = res.data.list
              this.fileList = this.catelist.img ? [{
                url:this.$imgUrl + this.catelist.img
              }] : []
              this.catelist.img = this.fileList
              this.catelist.id = id
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.cateInfo.validate((valid) => {
          if (valid) {
            this.catelist.img = this.imgUrl ? this.imgUrl : this.list.img;
            let file = new FormData();
            for (let i in this.catelist) {
              file.append(i, this.catelist[i]);
            }
            cateEdit(file)
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
        OPcatelist : 'cate/getcatelist'
      })
    }
  }
</script>

<style scoped>

</style>
