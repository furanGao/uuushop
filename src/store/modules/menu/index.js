import {menuList} from "@/util/axios";

const state = {
  listMenu :[]
}


const getters = {
  getmenulist(state){
    return state.listMenu
  }
}

const mutations = {
  GETMENULIST(state,payload){
    state.listMenu = payload
  }
}

const actions = {
  getMenuListAction({commit}){
    menuList()
      .then(res=>{
        if (res.data.code === 200) {
          commit('GETMENULIST',res.data.list)
        }
      })
  }
}

export default {
  state,getters,mutations,actions,namespaced:true
}
