import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const ActorApi={
  /**
   * 添加演员接口
   * @param {object} params {actorName:xxx,actorAvatarx:xxx}
   */
  add(params){
    return myAxios.post(BASEURL+'/movie-actor/add',params)
  },

  /**
   * 通过演员id删除演员接口
   * @param {object} params  {id:1}
   */
  delete(params){
    return myAxios.post(BASEURL+'/movie-actor/del',params)
  },

  /**
   * 查询演员列表接口
   * @param 
   * params:封装了请求参数的对象 {page:1,pagesize:100}
   * @returns 
   */
  list(params){
    return myAxios.get(BASEURL+'/movie-actors',params)
  },

  /**
   * 通过姓名模糊查询演员列表
   * @param {object} params {name:'马'}
   */
  listByName(params){
    return myAxios.post(BASEURL+'/movie-actors/name',params)
  },

  /**
   * 通过movieId,查询演员列表
   * @param {object} params
   */
  listByMovieId(params){
    return myAxios.get(BASEURL+'/movie-actors/movieid',params)
  }

}
export default ActorApi;