<template>
  <div>
    <el-dialog
      :title="digInfo.isAdd?'添加限时秒杀':'编辑限时秒杀'"
      :visible.sync="digInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form label-width="80px"
               :model="seckList"
               ref="seckInfo"
               :rules="rules">
        <el-form-item label='活动名称' prop="title">
          <el-input  autocomplete="off" v-model="seckList.title"></el-input>
        </el-form-item>
        <el-form-item label='活动期限'>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类"  >
          <el-select  placeholder="请选择"
                      @change="changeCate(false)"
                      v-model="seckList.first_cateid">
            <el-option
              v-for="item in cateList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" >
          <el-select  placeholder="请选择" @change="changeGoods(false)" v-model="seckList.second_cateid">
            <el-option
              v-for="item in secondList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品"  >
        <el-select  placeholder="请选择"
                    v-model="seckList.goodsid">
          <el-option
            v-for="item in goodsArr"
            :label="item.goodsname"
            :key="item.id"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="状态" >
          <el-switch
            v-model="seckList.status"
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
  import { seckAdd,seckInfo,seckEdit,getGoodsList} from '@/util/axios'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        seckList: {
          title:'',
          begintime:'',
          endtime:'',
          first_cateid:'',
          second_cateid:'',
          goodsid:'',
          status:1,
        },//初始数据
        secondList:[],
        goodsArr:[],
        value: '',
        rules : {
          title : [
            { required: true,message:'请输入正确的活动名称',trigger: 'blur'},
            { min: 2,max: 15,message: '长度在2到15个字符',trigger: 'blur'}
          ]
        }, //必填项验证规则
      }
    },
    props : ['digInfo'],
    mounted() {
      this.getcatelist()
    },
    methods: {
      ...mapActions({
        getlist:'seck/getSeckListAction',
        getroleList:'role/getMenuListAction',
        getgoodsList: 'goods/getGoodsListAction',
        getcatelist: 'cate/getCateListAction'
      }),
      cancel(){
        //取消按钮
        this.$emit('cancel',false)
        this.reset()
      },
      reset(){
        this.seckList = {
          roleid:'',
          seckname:'',
          password:'',
          status:1
        }
        this.$refs.seckInfo.resetFields()//清空验证
        this.value = ''
      },
      submit(){
        this.$refs.seckInfo.validate((valid) => {
          if (valid) {
            // console.log(this.seckList,'1111111111',this.value)
            this.seckList.begintime = new Date(this.value[0]).getTime()
            this.seckList.endtime = new Date(this.value[1]).getTime()
            seckAdd(this.seckList)
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
      },
      getmenuInfo(id){
        seckInfo({id})
          .then(res=>{
            if (res.data.code === 200) {
              this.seckList = res.data.list
              this.value = [new Date(parseInt(this.seckList.begintime)), new Date(parseInt(this.seckList.endtime))]
              this.seckList.id = id
              this.changeGoods(true)
              this.changeCate(true)
            }
          })
      },//读取一条详细信息，进行渲染
      editsubmit(){
        this.$refs.seckInfo.validate((valid) => {
          if (valid) {
            this.seckList.begintime = new Date(this.value[0]).getTime()
            this.seckList.endtime = new Date(this.value[1]).getTime()
            seckEdit(this.seckList)
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
        let idx = this.cateList.findIndex(item => item.id === this.seckList.first_cateid)
        this.secondList = this.cateList[idx].children
        if (!n){
          this.seckList.second_cateid = ''
          this.seckList.goodsid = ''
        }
      },
      changeGoods(n){
        getGoodsList({
          fid: this.seckList.first_cateid,
          sid: this.seckList.second_cateid
        }).then(res=> {
          if (res.data.code === 200){
            this.goodsArr = res.data.list
          }
        })
        if (!n){
          this.seckList.goodsid = ''
        }
      }
    },
    computed:{
      ...mapGetters({
        cateList : 'cate/getcatelist',
      })
    }
  }
</script>

<style scoped>

</style>
