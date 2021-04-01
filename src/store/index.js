import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
import user from './modules/manager'
import cate from './modules/goodsCate'
import specs from './modules/goodsSize'
import goods from './modules/goodsManger'
import member from './modules/goodsVip'
import banner from './modules/goodsBanner'
import seck from './modules/goodsLimit'


export default new Vuex.Store({
  state:{
    userInfo : sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  },
  getters:{
    getUserInfo(state){
      return state.userInfo
    }
  },
  mutations:{
    CHANGE_USERINFO(state,payload){
      if (payload){
        state.userInfo = payload
        sessionStorage.setItem('user',JSON.stringify(payload))
      }else{
        sessionStorage.removeItem('user')
      }

    }
  },
  actions:{
    changeUserInfoAction({commit},payload){
      commit('CHANGE_USERINFO',payload)
    }
  },
  modules: {
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    member,
    banner,
    seck
  },
})
