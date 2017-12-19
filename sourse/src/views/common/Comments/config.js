/*jshint esversion: 6 */
import axios from 'axios';

const ajaxHost = process.env.SERVICE_URL;
const config = {
  PAGESIZE: 5,
  businessType: 40101,
  appId: 37,
};

const ajax = axios.create({
  baseURL: ajaxHost,
  params: {
    corpid: sessionStorage.getItem('CORPID'),
    appid: sessionStorage.getItem('APPID')
  },
  withCredentials: true,
  headers: { 'Accept': 'application/json' }
});
// ajax请求路径配置
const reqUrl = {
  getCommentsList: `${ajaxHost}/userpreference/comment/list?business-type=${config.businessType}&app-id=${config.appId}`,
  getPriseList: `${ajaxHost}/userpreference/prise/list?business-type=${config.businessType}&app-id=${config.appId}`,
  prise: `${ajaxHost}/userpreference/prise/?business-type=${config.businessType}&app-id=${config.appId}`,
  comments: `${ajaxHost}/userpreference/comment/`,
};
// action type 配置
const types = {
  // 获取评论列表
  REQ_COMMENTSLIST: 'REQ_COMMENTSLIST',
  RES_COMMENTSLIST_SUCCESS: 'RES_COMMENTSLIST_SUCCESS',
  RES_COMMENTSLIST_FAIL: 'RES_COMMENTSLIST_FAIL',
  // 获取点赞列表
  REQ_PRISELIST: 'REQ_PRISELIST',
  RES_PRISELIST_SUCCESS: 'REQ_PRISELIST_SUCCESS',
  RES_PRISELIST_FAIL: 'REQ_PRISELIST_FAIL',
  // 查询是否点赞
  REQ_ISPRISE: 'REQ_ISPRISE',
  RES_ISPRISE_SUCCESS: 'RES_ISPRISE_SUCCESS',
  RES_ISPRISE_FAIL: 'RES_ISPRISE_FAIL',
  // 切换点赞状态
  REQ_TOGGLEPRISE: 'REQ_TOGGLEPRISE',
  RES_TOGGLEPRISE_SUCCESS: 'RES_TOGGLEPRISE_SUCCESS',
  RES_TOGGLEPRISE_FAIL: 'RES_TOGGLEPRISE_FAIL',
  // 删除评论
  REQ_DELCOMMENTS: 'REQ_DELCOMMENTS',
  RES_DELCOMMENTS_SUCCESS: 'RES_DELCOMMENTS_SUCCESS',
  RES_DELCOMMENTS_FAIL: 'RES_DELCOMMENTS_FAIL',
  // 发送评论
  REQ_SENDCOMMENTS: 'REQ_SENDCOMMENTS',
  RES_SENDCOMMENTS_SUCCESS: 'RES_SENDCOMMENTS_SUCCESS',
  RES_SENDCOMMENTS_FAIL: 'RES_SENDCOMMENTS_FAIL',
};


export {
  config,
  reqUrl,
  types,
  ajax
};
