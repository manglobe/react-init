import React, { Component } from 'react';
import { List, Switch } from 'antd-mobile';

const Item = List.Item;

class Switcher extends Component {
  state = {
    initialValue: true
  }
  onChange = () => {
    this.setState({ initialValue: !this.state.initialValue });
  }
  render() {
    return (
      <span>
        <List>
          <Item
            extra={<Switch
              checked={this.state.initialValue}
              onChange={this.onChange}
            />}
          >列表文字</Item>
        </List>
      </span>
    );
  }
}

export default Switcher;