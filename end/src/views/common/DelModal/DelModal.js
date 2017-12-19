import React, { Component } from 'react';
import { Modal, Button } from 'antd-mobile';

const alert = Modal.alert;


class DelModal extends Component {
  showAlert = () => {
    alert('提示', '会议取消后将通知各参会人,确定取消会议？', [
      { text: '取消', style: 'default' },
      { text: '确定' }
    ]);
  };
  render() {
    return (
      <span>
        <Button onClick={this.showAlert}> 取消会议 </Button>
      </span>
    );
  }
}

export default DelModal;