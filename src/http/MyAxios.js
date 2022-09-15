// 引入axios
import axios from 'axios'
// 创建axios实例
const instance=axios.create()
import qs from 'qs';
import store from '../store'

// 添加请求拦截器
instance.interceptors.request.use(config=>{
  // 从vuex中获取token，如果有，则设置header一起发送请求
  let token=store.state.token
  if(token){
    config.headers.authorization=token
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(response=>{
  if(response.data.code==401){
    // 用户token失效
    window.location='/user/login'
  }else{
    return response
  }
})

const myAxios={
  /**
   * 用于发送get请求
   * @param {String} url 请求资源路径
   * @param {Object} params 请求参数对象{参数名1：参数值1,参数名2：参数值2}
   */
  get(url,params){
    return instance({
      method:'get',
      url:url,
      params:params
    })
  },
  post(url,params){
    return instance({
      method:'post',
      url:url,
      data:qs.stringify(params)  //将params对象转换为查询字符串  key1=value1&key2=value2
    })
  }
}
export default myAxios;