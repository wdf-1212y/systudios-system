import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const ShowingonPlanApi={
  /**
   * 添加排片计划接口
   * @param {object} params
   */
  add(params){
    return myAxios.post(BASEURL+'/plan/add',params)
  },
  /**
   * 通过roomId,查询放映厅列表
   * @param {object} params {room_id:1}
   */
  queryByRoomId(params){
    return myAxios.get(BASEURL+'/plans/roomid',params)
  },
  /**
   * 根据id删除排片计划
   * @param {object} params
   */
  delete(params){
    return myAxios.post(BASEURL+'/plan/del',params)
  },
  /**
   * 发布排片计划
   * @param {object} params
   */
  publish(params){
    return myAxios.post(BASEURL+'/plan/publish',params)
  },
  /**
   * 排片计划设置为未发布状态
   * @param {object} params
   */
  noPublish(params){
    return myAxios.post(BASEURL+'/plan/no-publish',params)
  },
}
export default ShowingonPlanApi;