import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './index.scss';

class Btn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickAble: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      clickAble: true,
    });
  }
  handleClick = () => {
    this.props.onClick
      ? this
        .props
        .onClick()
      : console.log('未定义点击事件 Btn.js');
    this.props.reClickAble ? console.log('允许重复点击') : this.setState({
      clickAble: false,
    });
  };
  render() {
    const { useA } = this.props;
    const { clickAble } = this.state;
    return (this.props.to
      ? useA
        ? <a
          href={this.props.to || ''}
          target={this.props.target}
          className={classnames(style.btn, style[this.props.type], this.props.className)}>
          {this.props.value}
        </a>
        : <Link
          to={this.props.to || ''}
          target={this.props.target}
          className={classnames(style.btn, style[this.props.type], this.props.className)}>
          {this.props.value}
        </Link>
      : <a
        onClick={clickAble ? this.handleClick : null}
        className={classnames(style.btn, style[this.props.type], this.props.className)}>
        {this.props.value}
      </a>);
  }
}
export default Btn;