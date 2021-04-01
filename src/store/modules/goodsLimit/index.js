import {seckList} from "@/util/axios";

const state = {
  listseck :[],
}


const getters = {
  getsecklist(state){
    return state.listseck
  },
}

const mutations = {
  GETSECKLIST(state,payload){
    // console.log(state,payload,'------------我进来了')
    state.listseck = payload
  },
}

const actions = {
  getSeckListAction(context) {
    //调用接口并且将size和page传参
    seckList()
      .then(res => {
        if (res.data.code === 200) {
          context.commit('GETSECKLIST', res.data.list)
        }
      })
  },
}

export default {
  state,getters,mutations,actions,namespaced:true
}
