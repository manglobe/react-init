/* jshint esversion: 6 */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import Notifications from 'react-notify-toast';
import actions from './actions';
// 引入全局css
import { Toast } from 'antd-mobile';

// 引入不需要异步的模块
import sign, { wxSign } from '@vj/wx-sign';
import 'STATIC/style/common.css';
import 'STATIC/style/iconfont/iconfont.css';

import { config, path, ajax } from './config/config';

import Home from './views/Home';
import List from './views/List';
import Detail from './views/Detail';
import Editor from './views/Editor';

// const addOptlog = (id) => { // 埋点
//   ajax.post(path.optLog, '', {
//     params: {
//       url: window.location.href.replace(/^.*?[^/][/]{1}(?!\/)/, ''),
//       pointid: id,
//       appid: config.appId,
//       type: 2
//     }
//   });
// };

const setSession = keys => () => {
  keys.forEach(key => {
    const reg = new RegExp(`${key}=(\w+)`);
    const value = location.href.match(reg) ? location.href.match(reg)[1] : sessionStorage.getItem(key);
    sessionStorage.setItem(key, value);
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wxReady: false,
      access_token: '',
      params: {
        beta: true,
        debug: false,
        jsapi_ticket: 'string',
        appId: 'string', // cropID
        jsApiList: [
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ],
        // ready: ,        // 全局ready方法 since 1.2.1
        // error: ,   // 全局error方法 since 1.2.1
      }
    };
  }

  componentWillMount() {
    let _this = this;
    setSession(['appid', 'corpid']);
    this.props.getAdmin();
    ajax
      .get(`${path.wechat}`, {})
      .then((res) => {
        const { access_token, success } = res.data;
        if (!success) {
          Toast.info('登陆超时');
          return false;
        }
        let midParams = {
          ..._this.state.params,
          jsapi_ticket: access_token.js_api_ticket,
          jsApiList: ['previewImage', 'chooseImage', 'hideOptionMenu'],
          appId: corpid,
        };
        wxSign.config(midParams);
        _this.setState({
          wxReady: true,
          params: midParams,
        }, () => sign().then(() => {
          wx.hideOptionMenu();
        }));
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  componentDidMount() {
    // window.addEventListener('click', (e) => {
    //   if (e.path) {
    //     e.path.forEach(element => {
    //       element.dataset && element.dataset.optlog && addOptlog(element.dataset.optlog);
    //     });
    //   } else {
    //     e.target.dataset.dataset.optlog && addOptlog(e.target.dataset.optlog);
    //   }
    // });
  }
  componentWillReceiveProps(nextProps) {
    let newSearch = this.changeSearch((nextProps.history.location.search), {
      appid: sessionStorage.getItem('appid'),
      corpid: sessionStorage.getItem('corpid')
    });
    // history.replaceState({}, '', window.location.href.replace(/^(.*)?\??.*$/, `$1${newSearch}`));
    history.replaceState({}, '', window.location.href.replace(/\?.*$/, ``) + newSearch);
    wx.hideOptionMenu();
  }

  changeSearch = (seachStr, seachObj) => {
    let _seachStr = seachStr;
    for (let key in seachObj) {
      if (seachObj.hasOwnProperty(key)) {
        let reg = new RegExp(`([&|\?]${key}=)\w*`);
        if (reg.test(_seachStr)) {
          _seachStr.replace(reg, '$1' + seachObj[key]);
        } else {
          _seachStr += `${_seachStr.indexOf('?') === 0 ? '&' : '?'}${key}=${seachObj[key]}`;
        }
      }
    }
    return _seachStr;
  }

  render() {
    if (!this.state.wxReady) {
      // Toast.info('网络繁忙，请刷新重试');
      // return false;
    }
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <Switch>
          <Route
            path="/home"
            component={Home}
          />
          <Route
            path="/detail"
            component={Detail}
          />
          <Route
            path="/list"
            component={List}
          />
          <Route
            path="/Editor"
            component={Editor}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const {
    isAdmin
  } = state;
  return {
    isAdmin
  };
};

export default connect(mapStateToProps, actions)(App);

// export default App;
