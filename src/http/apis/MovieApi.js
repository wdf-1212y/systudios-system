import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const MovieApi={
  /**
   * 添加电影接口
   * @param {object} params {详情接口文档}
   */
  add(params){
    return myAxios.post(BASEURL+'/movie-info/add',params)
  },

  // 查询电影类别的列表
  listAllMovieTypes(){
    return myAxios.get(BASEURL+'/movie-types')
  },

  /**
   * 查询所有电影
   * @param {object} params {详情接口文档page,pagesize}
   */
  list(params){
    return myAxios.get(BASEURL+'/movie-infos',params)
  },

  /**
   * 通过电影名称模糊查询所有电影
   * @param {object} params {详情接口文档name,page,pagesize}
   */
   listByName(params){
    return myAxios.post(BASEURL+'/movie-infos/name',params)
  },

  /**
 * 删除相应ID的电影
 * @param {object} params {id:1}
 */
  delete(params){
    return myAxios.post(BASEURL+'/movie-info/del',params)
  },

 /**
 * 通过ID查询电影
 * @param {object} params {id:1}
 */
  queryById(params){
    return myAxios.get(BASEURL+'/movie-info/query',params)
  },

  /**
   * 更新电影信息接口
   * @param {object} params
   */
  update(params){
    return myAxios.post(BASEURL+'/movie-info/update',params)
  },

  /**
   * 为电影绑定演员列表
   * @param {object} params 接口文档  {movie_id:'1',actor_ids:'1,2,3,4,5'}
   */
  bindActors(params){
    return myAxios.post(BASEURL+'/movie-info/bind-actors',params)
  }

}
export default MovieApi;