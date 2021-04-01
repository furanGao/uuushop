import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

function hasUrl(url) {
  return store.getters.getUserInfo.menus_url.some(item => item === url);
}


Vue.use(Router)

export const indexRoutes = [  {
  path : '/menu',
  component : ()=>import('../views/menu/menu'),
  name: '菜单管理',
  beforeEnter(to, from, next) {
    hasUrl("/menu") ? next() : next("/home");
  }
},{
  path : '/admin',
  component : ()=>import('../views/manager/admin'),
  name: '管理员管理',
  beforeEnter(to, from, next) {
    hasUrl("/admin") ? next() : next("/home");
  }
},{
  path : '/role',
  component : ()=>import('../views/role/role'),
  name: '角色管理',
  beforeEnter(to, from, next) {
    hasUrl("/role") ? next() : next("/home");
  }
},{
  path : '/goodscate',
  component : ()=>import('../views/goodsCate/goodsCate'),
  name: '商品分类',
  beforeEnter(to, from, next) {
    hasUrl("/goodscate") ? next() : next("/home");
  }
},{
  path : '/goodssize',
  component : ()=>import('../views/goodsSize/goodsSize'),
  name: '商品规格',
  beforeEnter(to, from, next) {
    hasUrl("/goodssize") ? next() : next("/home");
  }
},{
  path : '/goodsmanager',
  component : ()=>import('../views/goodsManager/goodsmanger'),
  name: '商品管理',
  beforeEnter(to, from, next) {
    hasUrl("/goodsmanager") ? next() : next("/home");
  }
},{
  path : '/goodsvip',
  component : ()=>import('../views/goodsVip/member'),
  name: '会员管理',
  beforeEnter(to, from, next) {
    hasUrl("/goodsvip") ? next() : next("/home");
  }
},{
  path : '/goodsbanner',
  component : ()=>import('../views/goodsBanner/banner'),
  name: '轮播图管理',
  beforeEnter(to, from, next) {
    hasUrl("/goodsbanner") ? next() : next("/home");
  }
},{
  path : '/goodslimit',
  component : ()=>import('../views/goodsLimit/seck'),
  name: '秒杀活动',
  beforeEnter(to, from, next) {
    hasUrl("/goodslimit") ? next() : next("/home");
  }
},]

let router = new Router({
  routes: [
    {
      path: '/index',
      component: ()=>import('../pages/index'),
      children: [
       {
          path : '/home',
          component : ()=>import('../views/home')
        },
        ...indexRoutes,
        {
          path : '',
          redirect : '/home'
        }
      ]
    },{
      path: '/log',
      component: ()=>import('../pages/login')
    },{
      path: '*',
      redirect : '/log'
    }
  ]
})


// router.beforeEach((to,from,next)=>{
//   if (to.path === '/log'){
//     next()
//     return
//   }
//   console.log(store.getters.getUserInfo)
//   if (store.getters.getUserInfo){
//     next()
//     return;
//   }
//   next('/log')
// })

export default router
