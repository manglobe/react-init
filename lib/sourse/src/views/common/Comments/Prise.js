/* jshint esversion: 6 */
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { notify } from '../Toast';
import { reqUrl, ajax } from 'CONFIG/config';
import style from './assets/Comments.scss';
const cs = classnames.bind(style);
const stringify = (data) => {
  const params = new FormData();
  for (let i in data) {
    params.append(i, data[i]);
  }
  return params;
};

class Prise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPrise: false,
      isAnimate: false,
    };
    this.togglePrise = this.togglePrise.bind(this);
    this.initPrise = this.initPrise.bind(this);
  }

  componentDidMount() {
    this.initPrise();
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id }}} = this.props;
    const { match: { params: { id: newId }}} = nextProps;
    if (id !== newId) {

      this.setState({
        isAnimate: false
      });
    }
    this.initPrise();
  }

  initPrise() {
    const { match: { params: { id, pid }}} = this.props;
    const _this = this;
    const reqObj = {
      'business-id': pid,
      'business-sec-id': id,
    };
    ajax.get(reqUrl.prise, {
      params: {
        ...reqObj,
      }
    }).then(res => {
      console.log(res.data);
      let isPrise = res.data.priseRecord ? true : false;
      if (id === _this.props.match.params.id) {
        this.setState({
          isPrise
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  togglePrise() {
    const { isPrise } = this.state;
    const { match: { params }, togglePrise } = this.props;
    const _this = this;
    const reqObj = {
      'business-id': params.pid,
      'business-sec-id': params.id,
      'status': isPrise ? 0 : 1
    };
    ajax.put(reqUrl.prise, stringify(reqObj))
      .then(res => {
        let isPrise = reqObj.status === 1 && res.data.priseRecord[0] ? true : false;
        if (params.id === _this.props.match.params.id) {
          this.setState({
            isPrise,
            isAnimate: true
          });
        }
        togglePrise(res.data.priseRecord[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      isPrise,
      isAnimate,
    } = this.state;

    const Loading = () => (
      <div className="loading"><i></i></div>
    );

    return (
      <div className={style.wrap}>
        <div onClick={this.togglePrise} className={cs('like', { on: isPrise })}>
          <i className={cs('icon', 'vj', 'vj-like')}></i>
          <span className={cs(isAnimate ? isPrise ? 'likes' : 'dislikes' : '')}></span>
        </div>
      </div>
    );
  }
}

export default Prise;
