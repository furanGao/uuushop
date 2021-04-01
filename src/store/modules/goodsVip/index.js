import {memberList} from "@/util/axios";

const state = {
  listmember :[]
}


const getters = {
  getmemberlist(state){
    return state.listmember
  }
}

const mutations = {
  GETMEMBERLIST(state,payload){
    state.listmember = payload
  }
}

const actions = {
  getMemberListAction({commit}){
    memberList()
      .then(res=>{
        if (res.data.code === 200) {
          commit('GETMEMBERLIST',res.data.list)
        }
      })
  }
}

export default {
  state,getters,mutations,actions,namespaced:true
}
