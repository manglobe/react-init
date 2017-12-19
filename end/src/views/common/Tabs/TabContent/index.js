import React, {
  Component
} from 'react';

class TabContent extends Component {
  componentDidMount() {
    this.props.initFunc && this.props.initFunc();
  }
  componentWillReceiveProps(nextProps) {
    const { activeIndex } = nextProps;
    if (this.props.activeIndex !== nextProps.activeIndex) {
      this.props.initFunc && this.props.initFunc(activeIndex + 1);
    }
  }

  render() {
    const { activeIndex, contentFunc } = this.props;

    return (
      <div style={this.props.style}>
        {/* {contentFunc && contentFunc(activeIndex + 1)} */}
        {contentFunc}
      </div>
    );
  }
}

export default TabContent;