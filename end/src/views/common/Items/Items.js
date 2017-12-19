import React from 'react';
import SVGInline from 'react-svg-inline';
import style from './index.scss';

const Items = ({ svg, name, logo }) => (
  <span className={style.box}>
    <span>
      <span className={style.imgBox}>
        <img src={logo || require('IMG/avatar_default.png')} alt="" className={style.img} />
        <span className={style.svg}>
          <SVGInline svg={svg} />
        </span>
      </span>
      <p className={style.text}>
        {name || <span></span>}
      </p>
    </span>
  </span>
);

export default Items;