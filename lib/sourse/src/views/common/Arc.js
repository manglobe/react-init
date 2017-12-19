import React, { Component } from 'react';


class Arc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winW: 320,
      svgH: 0,
      svgC: 0,
    };
    this.handelChangeSvg = this.handelChangeSvg.bind(this);
  }
  componentWillMount() {
    this.handelChangeSvg();
  }
  componentDidMount() {
    window.addEventListener('resize', this.handelChangeSvg, false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handelChangeSvg, false);
  }
  handelChangeSvg() {
    const winW = window.innerWidth;
    this.setState({
      winW: winW,
      svgH: parseInt(winW * 0.08),
      svgC: parseInt(winW * 2.1),
    });
  }
  render() {
    const { svgH, svgC, winW } = this.state;
    return (
      <div style={{ position: 'relative', marginTop: -svgH + 2 }} className={this.props.className}>
        <svg width="100%" height={`${svgH}px`}>
          <path d={`M 0 0A${svgC} ${svgC} 0 0 0 ${winW} 0V${svgH}H0V0`} fill="#fff"></path>
        </svg>
      </div>
    );
  }
}

export default Arc;
