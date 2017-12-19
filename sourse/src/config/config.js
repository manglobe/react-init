/* jshint esversion: 6 */
import axios from 'axios';

const config = {
  PAGESIZE: 5,
  IMG_PATH: process.env.IMG_PATH,
  AUDIO_PATH: process.env.AUDIO_PATH,
  HOST: process.env.SERVICE_URL,
  businessType: {#businessType#},  // 会议纪要 busst
  appId: {#appId#},
};


const getParam = function (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
};

if (!sessionStorage.getItem('CORPID')) {
  sessionStorage.setItem('CORPID', getParam('corpid') || '');
  sessionStorage.setItem('APPID', getParam('appid') || '');
}

const ajax = axios.create({
  baseURL: config.HOST,
  params: {
    corpid: sessionStorage.getItem('CORPID'),
    appid: sessionStorage.getItem('APPID')
  },
  withCredentials: true,
  headers: { 'Accept': 'application/json' }
});

// ajax请求路径配置
const path = {

  wechat: `${config.HOST}company/accesstoken/token`, // wechat
  // wechat: `${config.HOST}/company/accesstoken/token?appid=${config.appId}&corpid=${sessionStorage.getItem('CORPID')}`, // wechat
  uploadWechat: `${config.HOST}file/upload/media`,
  upload: `${config.HOST}zuul/file/upload`,

  // 埋点
  optLog: `${config.HOST}logger/log/insert`,   // appid, pointid, url, type 
};

export { config, path, ajax };
