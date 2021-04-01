import axios from "axios";
import router from '@/router'

let http = axios.create({
  baseURL: '/api'
})
//请求拦截器
http.interceptors.request.use(req => {
  //一般在请求拦截器中会操作请求头
  //可是设置token
  let token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : ''
  req.headers.authorization = token
  return req
})
//相应拦截器
http.interceptors.response.use(res=>{
  //一般会全局拦截错误 或者对返回值进行封装
  // return res.data  可以直接返回data 取值方便
  if (res.data.code === 403){
    //全局拦截错误 重新登陆
    router.push('/log')
  }//针对token过期或者失效进行全局拦截
  return res
})
export default http
