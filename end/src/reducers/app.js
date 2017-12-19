import types from 'CONFIG/types';

const initState = {
  isFetching: true
};
let is_admin = false;
export const isAdmin = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ADMIN_S:
      is_admin = (action.success && action.personMsg[0]); // 使用人信息
      return is_admin;
    case types.GET_ADMIN_F:
      is_admin = false;
      return is_admin;
    default:
      return is_admin;
  }
};
