import React, { Component } from 'react';
import style from './ReadMember.scss';
import SVGInline from 'react-svg-inline';
// const PROPS = {
//   memberList: ['静态数据1', '静态数据2', '静态数据3']
// };
class ReadMember extends Component {
  state= { open: false }
  open =() => {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const {
      memberList
    } = this.props;
    const {
      open
    } = this.state;
    console.log(memberList);
    return (
      <div className={style.readMember}>
        <span className={style.title}>已读成员 ({memberList ? memberList.length : 0})  </span>
        <span className={`${style.controller} ${open && style.open}`}>
            展开
          <SVGInline svg={require('IMG/filter_arrow_right.svg')} onClick={this.open} />
        </span>
        <div className={`${style.content} ${open && style.open}`}>
          {memberList ? memberList.join(', ') : ''}
        </div>
      </div>
    );
  }
}

export default ReadMember;