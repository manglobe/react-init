/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, {Component} from 'react';

const bgStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  color: '#333',
  fontSize: '16px',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: 999,
  display: 'none',
};

const contStyle = {
  width: '280px',
  height: '165px',
  backgroundColor: 'rgba(250, 250, 250, .96)',
  borderRadius: '8px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-82px 0 0 -140px',
};

const btnStyle = {
  width: '50%',
  lineHeight: '44px',
  borderTop: '1px solid #ccc',
  display: 'inline-block',
  fontSize: '18px',
};

class Confirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show || false
    };

    this.onClose = this.onClose.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  onOk(){
    this.onClose();
    this.props.onOk();
  }

  onClose(){
    this.setState({
      show: false
    });
    this.props.onClose();
  }

  render() {

    return (
      <div style={Object.assign({}, bgStyle, {display: this.state.show ? 'block' : 'none'})}>
        <div style={contStyle}>
          <div style={{lineHeight: '120px'}}>{this.props.msg}</div>
          <ul>
            <li
              style={Object.assign({}, btnStyle, {borderRight: '1px solid #ccc'})}
              onClick={this.onClose}
            >
              {this.props.btn ? this.props.btn[0] : '取消'}
            </li>
            <li
              style={Object.assign({}, btnStyle, {color: '#FD5454'})}
              onClick={this.onOk}
            >
              {this.props.btn ? this.props.btn[1] : '确定'}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Confirm;
