import {roleList} from "@/util/axios";

const state = {
  listRole :[]
}


const getters = {
  getrolelist(state){
    return state.listRole
  }
}

const mutations = {
  GETMENULIST(state,payload){
    state.listRole = payload
  }
}

const actions = {
  getMenuListAction({commit}){
    roleList()
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
