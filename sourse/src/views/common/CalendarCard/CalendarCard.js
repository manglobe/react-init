import React, { Component } from 'react';
import style from './CalendarCard.scss';
import moment from 'moment';

const PROPS = {
  over: false,
  date: moment()
};
class CalendarCard extends Component {
  state = { }
  render() {
    const { props } = this;
    const {
      over,
      date
    } = { ...PROPS, ...props };
    const dateMid = moment(date);
    return (
      <div className={`${style.wrap} ${over && style.over}`}>
        <span className={style.month}>
          {`${dateMid.year()}-${dateMid.month() + 1}`}
        </span>
        <span className={style.day}>
          {`${dateMid.date()}`}
        </span>
        <span className={style.week}>
          {`星期${['日', '一', '二', '三', '四', '五', '六'][dateMid.weekday()]}`}
        </span>
      </div>
    );
  }
}

export default CalendarCard;