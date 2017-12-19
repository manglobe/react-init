import React, { Component } from 'react';
const PROPS = {
  copyBotton: <button type="" >12312312</button>
};

class CopyAppend extends Component {
  state = {
    array: [1]
  }
  copyAppend = () => {
    const { array } = this.state;
    this.setState({
      array: [...array, 1]
    });
  }
  render() {
    const { children, className, copyBotton } = { ...PROPS, ...this.props };
    const { array } = this.state;
    return (
      <span className={className}>
        {array.map((ele, index) => <span key={index}>{children} </span>)}
        <span onClick={this.copyAppend}>
          {copyBotton}
        </span>
      </span>
    );
  }
}

export default CopyAppend;