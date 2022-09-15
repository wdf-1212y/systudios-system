import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const AdminApi={
  /**
   * 执行登录业务
   * @param {object} params {username:xxx,password:xxx}
   */
  login(params){
    return myAxios.post(BASEURL+'/user/login',params)
  },
}
export default AdminApi;