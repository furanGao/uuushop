<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加商品管理':'编辑商品管理'"
      :visible.sync="digInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditer"
    >
      <el-form label-width="80px" :model="goodsInfoList" ref="goodsRef" :rules="rules">
        <el-form-item label="一级分类" prop="first_cateid" >
          <el-select  placeholder="请选择"
                      @change="changeCate(false)"
                      v-model="goodsInfoList.first_cateid">
            <el-option
              v-for="item in catelist"
              :label="item.catename"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select  placeholder="请选择" v-model="goodsInfoList.second_cateid">
            <el-option
              v-for="item in secondList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='商品名称' prop="goodsname">
          <el-input  v-model="goodsInfoList.goodsname"></el-input>
        </el-form-item>
        <el-form-item label='价格' prop="price">
          <el-input  v-model="goodsInfoList.price"></el-input>
        </el-form-item>
        <el-form-item label='市场价格' prop="market_price">
          <el-input  v-model="goodsInfoList.market_price"></el-input>
        </el-form-item>
        <el-form-item label='图片'>
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="specsid">
          <el-select  placeholder="请选择" v-model="goodsInfoList.specsid" @change="changeSpecs(false)">
            <el-option
              v-for="item in specslist"
              :label="item.specsname"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" prop="specsattr">
          <el-select  placeholder="请选择" v-model="goodsInfoList.specsattr" multiple>
            <el-option
              v-for="item in specsList"
              :label="item"
              :key="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio v-model="goodsInfoList.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsInfoList.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="goodsInfoList.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsInfoList.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" >
          <el-switch
            v-model="goodsInfoList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value = '1'
            :inactive-value = '2'
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="box"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addsubmit" v-if="digInfo.isAdd">确 定</el-button>
        <el-button type="primary" @click="editsubmit" v-else>编 辑</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getGoodsAdd,getGoodsInfo,getGoodsEdit } from '../../util/axios'
  import {mapActions,mapGetters} from 'vuex'
  import E from 'wangeditor'
  export default {
    data(){
      return {
        goodsInfoList: {
          first_cateid : '',
          second_cateid : '',
          goodsname : '',
          price : "",
          market_price : '',
          img : '',
          description : '',
          specsid : '',
          specsattr : '',
          isnew : 1,
          ishot : 1,
          status : 1,
        },//初始数据
        dialogImageUrl: '',//预览时调用的图片地址
        dialogVisible: false,//控制图片预览时的显示和隐藏
        fileList:[],//用于图片回显
        secondList:[],
        specsList:[],
        imgUrl: "",
        editor:'',
        rules : {
          goodsname : [
            { required: true,message:'请输入正确的分类名称',trigger: 'blur'},
            { min: 2,max: 12,message: '长度在2到12个字符',trigger: 'blur'}
          ],
          price : [
            { required: true,message:'请输入正确的分类名称',trigger: 'blur'},
          ],
          market_price : [
            { required: true,message:'请输入正确的分类名称',trigger: 'blur'},
          ],
          first_cateid : [
            { required: true,message: '请选择一级分类',trigger: 'change'},
          ],
          second_cateid : [
            { required: true,message: '请选择二级分类',trigger: 'blur'},
          ],
          specsid : [
            { required: true,message: '请选择商品规格',trigger: 'change'},
          ],
          specsattr : [
            { required: true,message: '请选择商品属性',trigger: 'blur'},
          ]
        }, //必填项验证规则
      }
    },
    props : ['digInfo'],
    computed:{
      ...mapGetters({
      specslist : 'specs/getspecslist',
      catelist :'cate/getcatelist'
    })
    },
    mounted() {
      this.getcateList()
      this.getspecsList()
    },
    methods: {
      ...mapActions({
        getlist:'goods/getGoodsListAction',
        getspecsList:'specs/getSpecsListAction',
        getgoodscount: 'goods/getGoodsCountAction',
        getcateList:'cate/getCateListAction'
      }),
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },//移除时的钩子函数
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },//预览时的钩子函数
      changeImg(file){
        this.imgUrl = file.raw
      },//图片改变的钩子函数
      exceedImg(file,fileList){
        this.$message.warning(`当前限制选择1个文件，本次选择了${file.length}个文件，共选择了
        ${file.length + fileList.length}个文件`)
      },//限制上传的钩子函数
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },
      reset(){
        this.goodsInfoList = {
          first_cateid : '',
          second_cateid : '',
          goodsname : '',
          price : '',
          market_price : '',
          img : '',
          description : '',
          specsid : '',
          specsattr : '',
          isnew : 1,
          ishot : 1,
          status : 1,
        }
        this.$refs.goodsRef.resetFields()//清空验证
        this.fileList = []
      },
      addsubmit(){
        this.$refs.goodsRef.validate((valid) => {
          if (valid) {
            this.goodsInfoList.specsattr =  this.goodsInfoList.specsattr.join(',')
            this.goodsInfoList.img = this.imgUrl;
            this.goodsInfoList.description = this.editor.txt.html()
            let file = new FormData();
            for (let j in this.goodsInfoList){
              file.append(j,this.goodsInfoList[j]);
            }
            getGoodsAdd(file).then(res =>{
                if (res.data.code === 200){
                  this.$message.success(res.data.msg)
                  this.cancel()
                  this.getlist()
                  this.getgoodscount()
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
        getGoodsInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              this.goodsInfoList = res.data.list
              this.goodsInfoList.specsattr = this.goodsInfoList.specsattr?res.data.list.specsattr.split(','):[]
              this.fileList = this.goodsInfoList.img ? [{
                url:this.$imgUrl + this.goodsInfoList.img
              }] : []
              this.goodsInfoList.id = id
              this.changeCate(true)
              this.changeSpecs(true)
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.goodsRef.validate((valid) => {
          if (valid) {
            this.goodsInfoList.specsattr =  this.goodsInfoList.specsattr.join(',')
            this.goodsInfoList.img = this.imgUrl?this.imgUrl:this.goodsInfoList.img;
            this.goodsInfoList.description = this.editor.txt.html()
            let file = new FormData();
            for (let j in this.goodsInfoList){
              file.append(j,this.goodsInfoList[j]);
            }
            getGoodsEdit(file)
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
      changeCate(n){
        let idx = this.catelist.findIndex(item => item.id === this.goodsInfoList.first_cateid
        )
        this.secondList = this.catelist[idx].children
        if (!n) {
          this.goodsInfoList.second_cateid = ''
        }
      },
      changeSpecs(n){
        let idx = this.specslist.findIndex(item => item.id === this.goodsInfoList.specsid
        )
        this.specsList = this.specslist[idx].attrs
        if (!n) {
          this.goodsInfoList.specsattr = []
        }
      },
      createEditer(){
        this.editor = new E('#box')
        this.editor.create()
        this.editor.txt.html(this.goodsInfoList.description)
      }
    }
  }
</script>
<style scoped>

</style>
