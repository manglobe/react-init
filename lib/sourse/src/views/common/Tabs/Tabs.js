import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, WingBlank, WhiteSpace, PullToRefresh } from 'antd-mobile';
import TabContent from './TabContent';
import style from './index.scss';
import SegmentedControl from 'COMMON/SegmentedControl/SegmentedControl';
// const PROPS = {
//   title: ['待参加', '已结束', '我发布的'], // tab导航分页
//   contentFunc: ()=><div></div>     // tab内容函数
//   initFunc: (index) => console.log(index)     // tab切换时触发,参数为tab下标
// };
class Tabs extends Component {
  state = {
    activeIndex: 0,
    height: '100vh',
    refreshing: false
  }

  componentWillMount() {
    this.setState({
      activeIndex: this.props.initIndex
    });
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }

  change = (index) => {
    const { onChange } = this.props;
    onChange && onChange(index);
    this.setState({ activeIndex: index });
  }

  reFresh=() => {
    const { reFresh } = this.props;
    this.setState({
      refreshing: true
    });
    reFresh && reFresh().then(res => {

      this.setState({
        final: res.obj.msg
      }, () => {
        this.setState({
          refreshing: false,
        });
      });
    }).catch(error => {
      this.setState({
        refreshing: false
      });
    });
  }
  render() {
    const {
      props
    } = this;
    const { title, contentFunc, initFunc } = props;
    const { activeIndex, height } = this.state;
    return (
      <div className={this.props.className}>

        <List style={{ position: 'relative', zIndex: '2' }}>
          <WingBlank size="md">
            <WhiteSpace size="sm" />
            <SegmentedControl
              className={this.props.navClassName}
              selectedIndex={activeIndex}
              values={title && title.map(ele => ele)}
              tintColor={'#60A0F4'}
              onChange={this.change}
            />
            <WhiteSpace size="sm" />
          </WingBlank>
        </List>
        <div
          className={style.scrollWrap}
        >
          <PullToRefresh
            ref={el => this.ptr = el}
            className={style.scrollBox}
            style={{
              overflow: 'auto',
            }}
            distanceToRefresh={15}
            indicator={{
              activate: <span style={{ 'fontSize': '14px' }}>上拉可以刷新</span>,
              finish: <span style={{ 'fontSize': '14px' }}>{this.state.final}</span>
            }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshing}
            onRefresh={this.reFresh}
          >
            {
              <List className={style.list}>
                <TabContent
                  activeIndex={activeIndex}
                  initFunc={initFunc}
                  contentFunc={contentFunc}
                >
                </TabContent>
              </List>
            }
          </PullToRefresh>
        </div>

      </div>
    );
  }
}

export default Tabs;