import { bannerList } from "@/util/axios";

const state = {
  listbanner :[]
}


const getters = {
  getbannerlist(state){
    return state.listbanner
  }
}

const mutations = {
  GETBANNERLIST(state,payload){
    state.listbanner = payload
  }
}

const actions = {
  getbannerListAction({commit}){
    bannerList()
      .then(res=>{
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list : []
          commit('GETBANNERLIST',list)
        }
      })
  }
}

export default {
  state,getters,mutations,actions,namespaced:true
}
