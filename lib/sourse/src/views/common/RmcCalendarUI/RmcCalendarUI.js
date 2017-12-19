import React, { Component } from 'react';
import Calendar from '@vj/rmc-calendar';
import moment from 'moment';
import style1 from './RmcCalendarUI.scss';
import style2 from './RmcCalendarUI2.scss';
import './index.scss';
class RmcCalendarUI extends Component {
  state={
    today: moment().format(`YYYY-MM-DD`),
    active: moment().format(`YYYY-MM-DD`),
  }
  componentWillMount() {
    this.setState({
      active: moment(this.props.active).format(`YYYY-MM-DD`),
    });
  }
  handleClick = (date) => {
    const { clickCall } = this.props;
    this.setState({
      active: date.date
    });
    clickCall && clickCall(date);
  };

  getDateReducer=(day1, day2) => {
    return (day1.replace(/-/g, '') - day2.replace(/-/g, ''));
  }

  handleGetCont = date => {
    const { today, active } = this.state;
    const { choosed } = this.props;
    const style = [style1, style2][this.props.type || 0];

    return (
      <span
        onClick={() => {
          if (this.getDateReducer(today, date.date) > 0) {
            return false;
          }
          this.handleClick(date);
        }}
        className={`
          ${style.date} 
          ${(this.getDateReducer(today, date.date) > 0) && style.beforeDay} 
          ${(today === date.date) && style.today} 
          ${(active === date.date) && style.active}
          ${(date.date.indexOf(choosed) > -1) && style.choosed}
        `}
      >
        {date.day}
      </span>
    );
  };

  render() {
    const { today, active } = this.state;
    const date = moment(active || today);
    const style = [style1, style2][this.props.type || 0];
    return (
      <div className={style.wrap}>
        {
          this.props.title && <div className={style.title}>
            <h3>2017</h3>
            <h1>{date.month() + 1}月{date.date()}日 星期{['日', '一', '二', '三', '四', '五', '六'][date.day()]}</h1>
          </div>
        }
        <Calendar
          weekClass={style.week}
          yearModelEnable={false}
          headerRender={obj => (
            <span className={style.head}>{`${obj.year}年${obj.month}月`}</span>
          )}
          render={this.handleGetCont}
          {...this.props}
        />
        {
          this.props.confirm && <div className={style.confirm}>
            <span onClick={this.props.confirm.onCancel}>取消</span>
            <span onClick={() => this.props.confirm.onConfirm(active)}>确认</span>
          </div>
        }
      </div>
    );
  }
}

export default RmcCalendarUI;

