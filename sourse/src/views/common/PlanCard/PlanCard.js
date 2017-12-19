import React, { Component } from 'react';
import style from './PlanCard.scss';
import CalendarCard from 'COMMON/CalendarCard/CalendarCard';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import Pup from 'COMMON/Popup/Pup';

// const PROPS = {
//   title: '产品设计',
//   plan: {
//     timeDuring: '09:30～10:45',
//     place: '小会议室',
//   },
//   point: {    // 右上角标记
//     content: '已请假',
//     style: { background: '#ff7d35' }
//   },
//   daily: false,        // 是否为定期会议
//   controller: false,     // 有无控制器(我发布的)
//   over: false,    // 是否已结束
//   summary: false,  // 有无会议纪要链接
//   date: new Date(), // 日历时间
//   id: 1, // 会议ID
// };

const Point = props => <span className={style.point} style={props.style}>{props.content}</span>;

class PlanCard extends Component {
  state = { }
  render() {
    // const { data = DATA } = this.props;
    const { props } = this;
    const {
      title,
      plan: {
        timeDuring,
        place,
      },
      point,
      daily,
      controller,
      over,
      date,
      id,
      unClickAble
    } = props;
    return (
      <div className={style.wrap}>

        <div className={style.flexBox}>
          {
            unClickAble
              ? <Link to={`/reserve/${id}`} className={style.link}>
                <CalendarCard over={over} date={date} />
                <section className={style.content}>
                  <h4>
                    {title}
                    {daily && <i className={style.daily}>定期</i>}
                  </h4>
                  <p className={style.msg}>
                    <span>
                      <SVGInline svg={require('IMG/icon_time_s.svg')} className={style.svg} />
                      {timeDuring}
                      <SVGInline svg={require('IMG/icon_location_s.svg')} className={style.svg} style={{ marginLeft: '40px' }} />
                      {place}
                    </span>
                  </p>
                </section>
              </Link>

              : <Link to={`/my/detail/${id}`} className={style.link}>
                <CalendarCard over={over} date={date} />
                <section className={style.content}>
                  <h4>
                    {title}
                    {daily && <i className={style.daily}>定期</i>}
                  </h4>
                  <p className={style.msg}>
                    <span>
                      <SVGInline svg={require('IMG/icon_time_s.svg')} className={style.svg} />
                      {timeDuring}
                      <SVGInline svg={require('IMG/icon_location_s.svg')} className={style.svg} style={{ marginLeft: '40px' }} />
                      {place}
                    </span>
                  </p>
                </section>
              </Link>

          }

          {
            controller &&
            <Pup className={style.btn_more} data={{
              layerSelect: controller
            }}>
              <SVGInline className={style.controller} svg={require('IMG/btn_more.svg')} />
            </Pup>
          }
        </div>

        {
          point && <Point {...point} />
        }
      </div>
    );
  }
}

export default PlanCard;