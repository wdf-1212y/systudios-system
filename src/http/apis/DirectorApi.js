import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const DirectorApi={
  /**
   * 添加导演接口
   * @param {object} params {directorName:xxx,directorAvatarx:xxx}
   */
  add(params){
    return myAxios.post(BASEURL+'/movie-director/add',params)
  },

  /**
   * 通过导演id删除导演接口
   * @param {object} params  {id:1}
   */
  delete(params){
    return myAxios.post(BASEURL+'/movie-director/del',params)
  },

  /**
   * 查询导演列表接口
   * @param 
   * params:封装了请求参数的对象 {page:1,pagesize:100}
   * @returns 
   */
  list(params){
    return myAxios.get(BASEURL+'/movie-directors',params)
  },

  /**
   * @param {object} params {name:'马'}
   */
  listByName(params){
    return myAxios.post(BASEURL+'/movie-directors/name',params)
  }

}
export default DirectorApi;