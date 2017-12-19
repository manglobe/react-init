import React, { Component } from 'react';
import ViewRange from '@vj/rmc-view-range';
import { List } from 'antd-mobile';
import styles from './ViewRangePicker.scss';
const PROPS = {
  title: '请输入标题',
  placeholder: '请用placeholder字段输入提示',
  value: {
    // personList: [   {     id: 236,     name: '测试人员4'   },   {     id: 602653,
    // name: '测试222'   }, ]
  }
};
class ViewRangePicker extends Component {
  constructor(props) {
    super(props);
    const { value } = {
      ...PROPS,
      ...props
    };
    this.state = {
      viewRange: ''
    };
  }
  ViewRangeOk = data => {
    this.setState({ viewRange: data });
    let midArr = [];
    data
      .personList
      .forEach((ele, index) => {
        midArr.push(`ROLE_PERSON_${ele.id}`);
      });
    data
      .departList
      .forEach((ele, index) => {
        midArr.push(`ROLE_DEPART_${ele.id}`);
      });
    this.props.onChange && this
      .props
      .onChange(midArr);
  };
  content = (viewRange, placeholder) => {
    const { value } = this.props;
    let midPersonList = viewRange.personList || value;
    if ((midPersonList && midPersonList.length) || (viewRange.departList && viewRange.departList.length)) {
      let midArr = [];
      if (midPersonList && midPersonList.length) {
        midArr = [
          ...midArr,
          ...midPersonList.map((ele, index) => ele.name)
        ];
      }
      if (viewRange.departList && viewRange.departList.length) {
        midArr = [
          ...midArr,
          ...viewRange
            .departList
            .map((ele, index) => ele.name)
        ];
      }
      return midArr.join(',');
    } else {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }
  }

  valueTranslate=() => {

  }

  render() {
    const { viewRange } = this.state;
    const { style, className, title, placeholder, outClassName } = {
      ...PROPS,
      ...this.props
    };
    return (

      <List.Item arrow="horizontal" className={outClassName}>
        <div className={styles.viewRangeBox}>
          <span className={styles.title}>{title}</span>
          <ViewRange
            {...this.props}
            {...viewRange}
            onOk={this.ViewRangeOk}
            placeholder={'搜索名字/拼音/手机号码/职位/部门'}
            wrapClass={`${styles.viewRange} ${className}`}
            personList={viewRange.personList || this.props.value}
            wrapStyle={style}>
            {this.content(viewRange, placeholder)}
          </ViewRange>
        </div>
      </List.Item>
    );
  }
}

export default ViewRangePicker;