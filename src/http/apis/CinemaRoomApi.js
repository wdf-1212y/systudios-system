import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const CinemaRoomApi={
    /**
   * 删除放映厅
   * @param {object} params {id:4}
   */
  delete(params){
    return myAxios.post(BASEURL+'/cinema-room/del',params)
  },
  /**
   * 添加放映厅接口
   * @param {object} params {详情接口文档}
   */
  add(params){
    return myAxios.post(BASEURL+'/cinema-room/add',params)
  },
  /**
   * 根据影院id查询所有放映厅
   */
  list(params){
    return myAxios.get(BASEURL+'/cinema-rooms/cinemaid',params)
  },
  /**
   * 查询所有放映厅类型
   */
  queryAllTypes(){
    return myAxios.get(BASEURL+'/cinema-room/types')
  },
  /**
   * 修改座位模板
   */
  updateSeatTemplate(params){
    return myAxios.post(BASEURL+'/cinema-room/edit-seat-template',params)
  },
  /**
   * 通过id查询放映厅信息
   */
   queryById(params){
    return myAxios.get(BASEURL+'/cinema-room/query',params)
  },
}
export default CinemaRoomApi;