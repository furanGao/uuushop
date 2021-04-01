import {userList,userCount} from "@/util/axios";

const state = {
  listUser :[],
  size:2,
  page:1,
  count:0
}


const getters = {
  getuserlist(state){
    return state.listUser
  },
  getusercount(state){
    return state.count
  },
  getusersize(state){
    return state.size
  }
}

const mutations = {
  GETUSERLIST(state,payload){
    // console.log(state,payload,'------------我进来了')
    state.listUser = payload
  },
  CHANGE_USERCOUNT(state,payload){
    state.count = payload
  },
  CHANGE_USERPAGE(state,payload){
    state.page = payload
  }
}

const actions = {
  getUserListAction(context){
    //调用接口并且将size和page传参
    userList({
      size:context.state.size,
      page:context.state.page
    })
      .then(res=>{
        if (res.data.code === 200) {
          context.commit('GETUSERLIST',res.data.list)
          let list = res.data.list ? res.data.list : []
          if (list.length === 0 && this.state.page !== 1){
            context.dispatch('getChangePage',context.state.page-1)
          }
        }
      })
  },//获取size+page下的数据列表
  getUserCountAction({commit}){
    userCount()
      .then(res=>{
        if (res.data.code === 200){
          commit('CHANGE_USERCOUNT',res.data.list[0].total)
        }
      })
  },//获取列表总条数
  getChangePage(context,payload){
    context.commit('CHANGE_USERPAGE',payload)//改变pages
    context.dispatch('getUserListAction')//重新渲染
  }//切换page后的新列表
}

export default {
  state,getters,mutations,actions,namespaced:true
}
