import { cateList } from "@/util/axios";

const state = {
  listCate :[]
}


const getters = {
  getcatelist(state){
    return state.listCate
  }
}

const mutations = {
  GETCATELIST(state,payload){
    state.listCate = payload
  }
}

const actions = {
  getCateListAction({commit}){
    cateList()
      .then(res=>{
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list : []
          commit('GETCATELIST',list)
        }
      })
  }
}

export default {
  state,getters,mutations,actions,namespaced:true
}
