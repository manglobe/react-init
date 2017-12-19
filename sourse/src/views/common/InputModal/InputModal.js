import React, { Component } from 'react';
import { Modal, Button } from 'antd-mobile';

const prompt = Modal.prompt;

class InputModal extends Component {
  showPrompt = () => {
    prompt('请输入请假原因', null, [
      { text: '取消' },
      { text: '保存' }
    ], 'default', null, ['请输入请假原因']);
  };
  render() {
    return (
      <span>
        <Button onClick={this.showPrompt}>请假弹框</Button>
      </span>
    );
  }
}

export default InputModal;