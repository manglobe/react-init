import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from './Table.scss';

const Th = (props) => (
  <tr className={style.box}>
    {props
      .th
      .map((x, index) => (
        x.x !== 0 && x.y !== 0 && <th rowSpan={x.y || 1} colSpan={x.x || 1} key={index}>
          {x.content}
        </th>
      ))}
  </tr>
);
const Td = (props) => (
  <tr className={style.box}>
    {props
      .td ? props
        .td
        .map((ele, index) => (
          ele.x !== 0 && ele.y !== 0 && <td rowSpan={ele.y || 1} colSpan={ele.x || 1} key={index}>
            {ele.content}
          </td>
        )) : null}
  </tr>
);

const Table = (props) => (
  <table className={classnames(style.table, props.className)} style={{ 'tableLayout': props.layout }}>
    {props.thArr && <thead>
      <Th th={props.thArr} />
    </thead>}
    <tbody>
      {props
        .tdArr
        ? props
          .tdArr
          .map((ele, index) => (<Td td={ele} key={index} />))
        : null}
    </tbody>
  </table>
);

export default Table;