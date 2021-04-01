import {getGoodsList,getGoodsCount} from "../../../util/axios";

const state = {
  listUser :[],
  size:2,
  page:1,
  count:0
}


const getters = {
  getgoodslist(state){
    return state.listUser
  },
  getgoodscount(state){
    return state.count
  },
  getgoodssize(state){
    return state.size
  }
}

const mutations = {
  GETGOODSLIST(state,payload){
    state.listUser = payload
  },
  CHANGE_GOODSCOUNT(state,payload){
    state.count = payload
  },
  CHANGE_GOODSPAGE(state,payload){
    state.page = payload
  }
}

const actions = {
  getGoodsListAction(context){
    //调用接口并且将size和page传参
    getGoodsList({
      size:context.state.size,
      page:context.state.page
    })
      .then(res=>{
        if (res.data.code === 200) {
          context.commit('GETGOODSLIST',res.data.list)
          let list = res.data.list ? res.data.list : []
          if (list.length === 0 && context.state.page !== 1){
            context.dispatch('getChangePage',context.state.page-1)
          }
        }
      })
  },//获取size+page下的数据列表
  getGoodsCountAction({commit}){
    getGoodsCount()
      .then(res=>{
        if (res.data.code === 200){
          commit('CHANGE_GOODSCOUNT',res.data.list[0].total)
        }
      })
  },//获取列表总条数
  getChangePage(context,payload){
    context.commit('CHANGE_GOODSPAGE',payload)//改变pages
    context.dispatch('getGoodsListAction')//重新渲染
  }//切换page后的新列表
}

export default {
  state,getters,mutations,actions,namespaced:true
}
