/* jshint esversion: 6 */
import React from 'react';
import classnames from 'classnames/bind';
import style from '../style/Empty.scss';
const cs = classnames.bind(style);

const Empty = (props) => {
  return (
    <div className={style.wrap}>
      <div className={cs({ birthday: props.birthday, entry: props.entry })}>
        <div className={style.bg}></div>
        <p className={style.tips}>
          {
            props.birthday ?
              '最近没有过生日的小伙伴'
              :
              props.entry ?
                '亲，周年榜单暂无内容'
                : null
          }
        </p>
      </div>
    </div>
  );
};

export default Empty;
