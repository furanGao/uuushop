import http from "./http";

// ================================菜单接口================================
export function menuAdd(data) {
  return http.post('/api/menuadd',data)
}//菜单添加

export function menuList() {
  return http.get('/api/menulist',{
    params:{
      istree :true
    }
  })
}//菜单列表

export function menuInfo(params) {
  return http.get('/api/menuinfo',{
    params
  })
}//菜单详情

export function menuEdit(data) {
  return http.post('/api/menuedit',data)
}//菜单修改

export function menuDelete(data) {
  return http.post('/api/menudelete',data)
}//菜单删除




// ================================角色接口================================
export function roleAdd(data) {
  return http.post('/api/roleadd',data)
}//菜单添加

export function roleList() {
  return http.get('/api/rolelist',{
    params:{
      istree :true
    }
  })
}//菜单列表

export function roleInfo(params) {
  return http.get('/api/roleinfo',{
    params
  })
}//菜单详情

export function roleEdit(data) {
  return http.post('/api/roleedit',data)
}//菜单修改

export function roleDelete(data) {
  return http.post('/api/roledelete',data)
}//菜单删除


// ================================管理员接口================================

export function userAdd(data) {
  return http.post('/api/useradd',data)
}//管理员添加

export function userList(params) {
  return http.get('/api/userlist',{
    params
  })
}//管理员列表(分页)
export function userCount() {
  return http.get('/api/usercount')
}//管理员总数(计算分页)

export function userInfo(params) {
  return http.get('/api/userinfo',{
    params
  })
}//管理员详情（一条）

export function userEdit(data) {
  return http.post('/api/useredit',data)
}//管理员修改

export function userDelete(data) {
  return http.post('/api/userdelete',data)
}//管理员删除
export function userLogin(data) {
  return http.post('/api/userLogin',data)
}//管理员登陆

// ================================商品分类接口================================

export function cateAdd(data) {
  return http.post('/api/cateadd',data)
}//商品分类添加

export function cateList(params) {
  return http.get('/api/catelist',{
    params :{
      istree : true
    }
  })
}//商品分类列表

export function cateInfo(params) {
  return http.get('/api/cateinfo',{
    params
  })
}//商品分类详情（一条）

export function cateEdit(data) {
  return http.post('/api/cateedit',data)
}//商品分类修改

export function cateDelete(data) {
  return http.post('/api/catedelete',data)
}//商品分类删除


// ================================商品规格接口================================

export function specsAdd(data) {
  return http.post('/api/specsadd',data)
}//商品规格添加

export function specsCount(params) {
  return http.get('/api/specscount',{
    params
  })
}//商品规格总数（用于计算分页）

export function specsList(params) {
  return http.get('/api/specslist',{
    params
  })
}//商品规格列表

export function specsInfo(params) {
  return http.get('/api/specsinfo',{
    params
  })
}//商品规格获取（一条）

export function specsEdit(data) {
  return http.post('/api/specsedit',data)
}//商品规格修改

export function specsDelete(data) {
  return http.post('/api/specsdelete',data)
}//商品规格删除

// ================================商品管理接口================================
export function getGoodsAdd(data) {
  return http.post('/api/goodsadd',data)
}//商品管理添加

export function getGoodsCount() {
  return http.get('/api/goodscount')
}//商品管理总数（用于计算分页）

export function getGoodsList(params) {
  return http.get('/api/goodslist',{
    params
  })
}//商品管理列表

export function getGoodsInfo(params) {
  return http.get('/api/goodsinfo',{
    params
  })
}//商品管理获取（一条）

export function getGoodsEdit(data) {
  return http.post('/api/goodsedit',data)
}//商品管理修改

export function goodsDelete(data) {
  return http.post('/api/goodsdelete',data)
}//商品管理删除


// ================================会员管理接口================================


export function memberList() {
  return http.get('/api/memberlist')
}//会员列表

export function memberInfo(params) {
  return http.get('/api/memberinfo',{
    params
  })
}//会员详情

export function memberEdit(data) {
  return http.post('/api/memberedit',data)
}//会员修改

// ================================轮播图管理接口================================
export function bannerAdd(data) {
  return http.post('/api/banneradd',data)
}//轮播图添加

export function bannerList() {
  return http.get('/api/bannerlist')
}//轮播图列表

export function bannerInfo(params) {
  return http.get('/api/bannerinfo',{
    params
  })
}//轮播图详情

export function bannerEdit(data) {
  return http.post('/api/banneredit',data)
}//轮播图修改

export function bannerDelete(data) {
  return http.post('/api/bannerdelete',data)
}//轮播图删除

// ================================限时秒杀管理接口================================
export function seckAdd(data) {
  return http.post('/api/seckadd',data)
}//限时秒杀添加

export function seckList() {
  return http.get('/api/secklist')
}//限时秒杀列表

export function seckInfo(params) {
  return http.get('/api/seckinfo',{
    params
  })
}//限时秒杀详情

export function seckEdit(data) {
  return http.post('/api/seckedit',data)
}//限时秒杀修改

export function seckDelete(data) {
  return http.post('/api/seckdelete',data)
}//限时秒杀删除
