
import React, { Component } from 'react';
import style from './index.scss';
class SegmentedControl extends Component {
  state={
    active: 0
  }
  componentDidMount() {
    this.setState({
      active: this.props.selectedIndex
    });
  }
  click=index => () => {
    const { onChange } = this.props;
    this.setState({
      active: index
    });
    onChange && onChange(index);
  }

  render() {
    const { values } = this.props;
    const { active } = this.state;
    return (
      <div className={`${style.wrap} ${this.props.className}`}>
        {
          values && values.map((ele, index) => <span key={index} onClick={this.click(index)} className={`${style.item} ${(active === index) && style.active}`}>{ele}</span>)
        }
      </div>
    );
  }
}

export default SegmentedControl;