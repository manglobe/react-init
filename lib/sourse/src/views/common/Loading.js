/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, {Component} from 'react';
import style from '../style/Loading.scss';

const Loading = props => (
  <div className={style.loading}><i></i>{props.msg || ''}</div>
);

export default Loading;
