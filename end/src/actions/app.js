import { path, ajax } from 'CONFIG/config';
import  types from 'CONFIG/types';

export const getAdmin = () => dispatch => (
  ajax.get(path.wxAdmin).then(res => {
    dispatch({
      type: types.GET_ADMIN_S,
      success: res.data.success,
      personMsg: res.data.meet_input_persons,
      text: '成功_获取权限',
    });
  }).catch(error => (
    dispatch({
      type: types.GET_ADMIN_F,
      text: '失败_获取权限',
      is_admin: false
    })
  ))
);

