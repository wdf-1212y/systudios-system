import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const CinemaApi={
  /**
   * 添加电影院接口
   * @param {object} params {详情接口文档}
   */
  add(params){
    return myAxios.post(BASEURL+'/cinema/add',params)
  },
  /**
   * 查询所有电影院
   */
  list(){
    return myAxios.get(BASEURL+'/cinemas')
  },
  /**
   * 查询所有影院的标签
   */
  queryAllTags(){
    return myAxios.get(BASEURL+'/cinema/tags')
  }, 
   /**
   * 删除电影院
   * @param {object} params {id:4}
   */
  delete(params){
    return myAxios.post(BASEURL+'/cinema/del',params)
  },
  /**
   * 通过ID查询电影院
   * @param
   * params:存放影院ID的对象  {id:2}
   */
   queryById(params){
    return myAxios.get(BASEURL+'/cinema/query',params)
  }, 
  /**
   * 通过ID修改影院信息
   * @param {object} params 详情参考接口文档
   */
  update(params){
    return myAxios.post(BASEURL+'/cinema/update',params)
  },
}
export default CinemaApi;