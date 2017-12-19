import React, {
  Component
} from 'react';
import {
  List
} from 'antd-mobile';

// import style from './index.scss';
const Item = List.Item;
const PROPS = {
  extra: '信息',
  content: '带信息的列表',
  // onClick: () => console.log(`这是一个infolist`)
};
class InfoList extends Component {
  render() {
    const { props } = this;
    const {
      extra,
      content,
      onClick,
      className
    } = { ...PROPS, ...props };
    return (
      <Item extra={extra} arrow="horizontal" onClick={onClick} className={className}>{content}</Item>
    );
  }
}

export default InfoList;