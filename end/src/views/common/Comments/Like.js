/* jshint esversion: 6 */
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { Toast } from 'antd-mobile';
import { path as reqUrl, ajax } from 'CONFIG/config';
import style from './assets/Comments.scss';
const cs = classnames.bind(style);
const stringify = (data) => {
  const params = new FormData();
  for (let i in data) {
    params.append(i, data[i]);
  }
  return params;
};

class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      isAnimate: false,
    };
    this.toggleLike = this.toggleLike.bind(this);
    this.initLike = this.initLike.bind(this);
  }

  componentDidMount() {
    this.initLike();
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } } } = this.props;
    const { match: { params: { id: newId } } } = nextProps;
    if (id !== newId) {

      this.setState({
        isAnimate: false
      });
    }
    this.initLike();
  }

  initLike() {
    const { match: { params: { id }}} = this.props;
    const _this = this;
    const reqObj = {
      'business-id': +id,
      'business-sec-id': 0,
    };
    ajax.get(reqUrl.like, {
      params: {
        ...reqObj,
      }
    }).then(res => {
      console.log(res.data);
      let isLike = res.data.LikeRecord ? true : false;
      if (id === _this.props.match.params.id) {
        this.setState({
          isLike
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  toggleLike() {
    const { isLike } = this.state;
    const { match: { params }, toggleLike } = this.props;
    const _this = this;
    const reqObj = {
      'business-id': params.id,
      'business-sec-id': 0,
      'status': isLike ? 0 : 1
    };
    ajax.put(reqUrl.like, stringify(reqObj))
      .then(res => {
        let isLike = reqObj.status === 1 && res.data.likeRecord[0] ? true : false;
        if (params.id === _this.props.match.params.id) {
          this.setState({
            isLike,
            isAnimate: true
          });
        }
        toggleLike(res.data.likeRecord[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      isLike,
      isAnimate,
    } = this.state;

    const Loading = () => (
      <div className="loading"><i></i></div>
    );

    return (
      <div className={style.wrap}>
        <div onClick={this.toggleLike} className={cs('like', { on: isLike })}>
          <i className={cs('icon', 'vj', 'vj-like')}>collect</i>
          <span className={cs(isAnimate ? isLike ? 'likes' : 'dislikes' : '')}></span>
        </div>
      </div>
    );
  }
}

export default Like;
