import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const MovieApi={
  /**
   * 添加剧照接口
   * @param {object} params {详情接口文档}
   */
  add(params){
    return myAxios.post(BASEURL+'/movie-thumb/add',params)
  },

  // 查询相应电影id下的所有剧照
  listByMovieId(params){
    return myAxios.get(BASEURL+'/movie-thumbs/movieid',params)
  },

  /**
 * 删除相应ID的剧照
 * @param {object} params {id:1}
 */
  delete(params){
    return myAxios.post(BASEURL+'/movie-thumb/del',params)
  },

}
export default MovieApi;