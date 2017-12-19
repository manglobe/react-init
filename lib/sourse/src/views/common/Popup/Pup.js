import React, { Component } from 'react';

import { Modal, List, WhiteSpace } from 'antd-mobile';
import style from './index.scss';

// const Item = List.Item;
// const DATA = {
//   layerSelect: [
//     {
//       content: '取消会议',
//       func: () => console.log('取消会议'),
//     },
//     {
//       content: '修改会议',
//       func: () => console.log('修改会议'),
//     },
//     {
//       content: '复制会议',
//       func: () => console.log('复制会议'),
//     }

//   ]
// };

class Pup extends Component {
  state = {
    modal2: false,
  };
  componentWillUnmount() {
    this.onClose('modal2')();
  }

  outView = (key) => {
    this.setState({
      [key]: true,
    });
  }
  onClick = key => (e) => {
    e.preventDefault();
    const { clickCallBefore } = this.props;
    clickCallBefore && clickCallBefore();
    this.setState({
      [key]: true,
    });
  };

  selectClick=(func) => {
    // func && func().then(res => this.onClose('modal2')());
    this.onClose('modal2')(func);
  }

  onClose = key => (func) => {

    this.setState({
      [key]: false,
    }, () => {
      if (typeof func === 'function') { setTimeout(func, 300) }
      // func();
    });
  }

  render() {
    const { data } = this.props;
    return (
      <span onClick={this.onClick('modal2')} style={this.props.style} className={this.props.className}>
        {this.props.children}
        <Modal
          popup
          visible={this.state.modal2}
          maskClosable={false}
          animationType="slide-up"
        >
          <div className={style.popup}>
            {data.layerSelect.map((ele, index) => (
              <div className={style.btn} key={index} onClick={() => this.selectClick(ele.func)} data-optlog={ele.optlog}>{ele.content}</div>
            ))}
            <WhiteSpace size="sm" />
            <div className={`${style.btn} ${style.cancel}`} onClick={this.onClose('modal2')}>取消</div>
          </div>
        </Modal>
      </span>

    );
  }
}

export default Pup;