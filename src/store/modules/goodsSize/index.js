import {specsList,specsCount} from "@/util/axios";

const state = {
  listUser :[],
  size:2,
  page:1,
  count:0
}


const getters = {
  getspecslist(state){
    return state.listUser
  },
  getspecscount(state){
    return state.count
  },
  getspecssize(state){
    return state.size
  }
}

const mutations = {
  GETSPECSLIST(state,payload){
    // console.log(state,payload,'------------我进来了')
    state.listUser = payload
  },
  CHANGE_SPECSCOUNT(state,payload){
    state.count = payload
  },
  CHANGE_SPECSPAGE(state,payload){
    state.page = payload
  }
}

const actions = {
  getSpecsListAction(context){
    //调用接口并且将size和page传参
    specsList({
      size:context.state.size,
      page:context.state.page
    })
      .then(res=>{
        if (res.data.code === 200) {
          context.commit('GETSPECSLIST',res.data.list)
          let list = res.data.list ? res.data.list : []
          if (context.state.page !== 1 && list.length === 0){
            context.dispatch('getChangePage',context.state.page-1)
          }
        }
      })
  },//获取size+page下的数据列表
  getSpecsCountAction({commit}){
    specsCount()
      .then(res=>{
        if (res.data.code === 200){
          commit('CHANGE_SPECSCOUNT',res.data.list[0].total)
        }
      })
  },//获取列表总条数
  getChangePage(context,payload){
    context.commit('CHANGE_SPECSPAGE',payload)//改变pages
    context.dispatch('getSpecsListAction')//重新渲染
  }//切换page后的新列表
}

export default {
  state,getters,mutations,actions,namespaced:true
}
