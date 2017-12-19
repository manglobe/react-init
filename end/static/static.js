/*jshint esversion: 6*/
import axios from 'axios';


const ajax = axios.create({
  baseURL: process.env.SERVICE_URL,
  params: {
    // corpid: sessionStorage.getItem('CORPID'),
    // appid: sessionStorage.getItem('APPID')
  },
  withCredentials: true,
  headers: {'Accept': 'application/json'}
});

const stringify = (data) => {
  const params = new FormData();
  for (let i in data){
    params.append(i, data[i]);
  }
  return params;
};

const getParam = function (name){
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
};

export default {
  ajax,
  stringify,
  getParam
};
