import React, { Component } from 'react';
import deleted from 'IMG/img_deleted.png';
import style from './index.scss';
import noright from 'IMG/img_noright.png';
import nores from 'IMG/img_list_empty.png';
import noinfo from 'IMG/img_info_empty.png';

const emptyInfo = [
  {
    img: deleted,
    content: '会议已删除',
    solve: ' 若有疑问请联系发起人'
  }, {
    img: noright, // 会议列表
    content: '您无需参加此会议',
    solve: ' 若有疑问请联系发起人'
  }, {
    img: nores,  // 会议纪要列表
    content: '暂无预约会议信息'
  }, {
    img: nores,
    content: '暂无会议纪要'
  }, {
    img: noinfo,
    content: '暂无会议室信息',
    solve: ' 若有疑问请联系发起人'
  }, {
    img: require('IMG/img_closed.png'),  // 会议室详情
    content: '今日停用',
  }, {
    img: require('IMG/img_closed.png'),  // 会议室详情
    content: '会议室已停用',
  }
];

class DelPage extends Component {
  constructor() {
    super();
    this.state = {
      // type: 3
    };
  }
  render() {
    const { type, outStyle } = this.props;
    return (
      <span className={style.del} style={outStyle} >
        <div>
          <img src={emptyInfo[type].img} />
          <span>
            {this.props.content || emptyInfo[type].content}
          </span>
          <span>
            {emptyInfo[type].solve}
          </span>
        </div>

      </span>
    );
  }
}
export default DelPage;