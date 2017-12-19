import React, { Component } from 'react';
import style from './BottomBar.scss';
import { Link } from 'react-router-dom';

class BottomBar extends Component {
  render() {
    const { children, className } = this.props;
    if (this.props.to) {
      return (
        <Link {...this.props} className={`${style.wrap} ${className}`}>
          {children}
        </Link>
      );
    }

    return (
      <div {...this.props} className={`${style.wrap} ${className}`}>
        {children}
      </div>
    );
  }
}

export default BottomBar;