import React, { Component } from 'react';
import style from './TimeProcess.scss';
import { Link } from 'react-router-dom';
const numIn = (number, round) => number > round[0] && number <= round[1]; // number 在 round 区间内
const numColor = (number, data) => {
  let colors = Object.keys(data);   // ['yellow','blue','gray'……]
  for (let i = 0; i < colors.length; i++) {
    let colorsVal = data[colors[i]];
    if (!colorsVal) {
      continue;
    }

    switch (colorsVal.constructor.name) {
      case 'Array':
        for (let u = 0; u < colorsVal.length; u++) {
          if (colorsVal[u].match(/[\d|\.]+/g).length === 1) {
            if (numIn(number, [colorsVal[u], +colorsVal[u] + 1])) {
              return colors[i];
            }
          }

          if (colorsVal[u].match(/[\d|\.]+/g).length === 2) {
            if (numIn(number, colorsVal[u].match(/[\d|\.]+/g))) {
              return colors[i];
            }
          }
        }
        break;
      case 'String':
        if (numIn(number, colorsVal.match(/[\d|\.]+/g))) {
          return colors[i];
        }
        break;
      default:
        console.error('类型错误');
        break;
    }

  }
};


const PROPS = {
  length: 24,
  min: 6,
  max: 12,
  // text: [`06:00`, `12:00`, `18:00`, `24:00`],
  text: [`06:00`, `7`, `8`, `9`, `10`, `11`, `12:00`],
  data: {
    yellow: [
      9, 11,
    ],
    blue: `6~8`
  }
};


class TimeProcess extends Component {
  click=(value) => {
    this.props.clickBlue(value);
  }
  render() {
    const { props } = this;
    const {
      length,
      min,
      max,
      data,
      text,
      className,
      clickBlue,
      isList,
    } = { ...PROPS, ...props };
    let numArray = [];
    for (let i = 1; i <= length; i++) {
      numArray.push(i);
    }
    return (
      <div className={`${style.wrap} ${className}`}>
        <div className={`${style.timeProcess} ${isList && style.isList}`}>
          {
            numArray.map((ele, index) => {
              let number = min + ele * (max - min) / length;
              number = Math.floor(number) + number % 1 * 0.6;
              return (
                // to && (numColor(number, data) === 'blue')
                //   ? <Link to={to} key={index} className={`${style.gray} ${style[numColor(number, data)]}`} >
                //     <i>
                //       {
                //         index + 1 === numArray.length
                //           ? text[text.length - 1]
                //           :
                //           (index % (numArray.length / (text.length - 1)))
                //             ? null
                //             : text[index / (numArray.length / (text.length - 1))]

                //       }
                //     </i>
                //   </Link>
                //   :
                <span
                  key={index}
                  className={`${style.gray} ${style[numColor(number, data)]}`}
                  onClick={clickBlue && (numColor(number, data) === 'blue') && (() => this.click(number))}
                >
                  <i>
                    {
                      index + 1 === numArray.length
                        ? text[text.length - 1]
                        :
                        (index % (numArray.length / (text.length - 1)))
                          ? null
                          : text[index / (numArray.length / (text.length - 1))]

                    }
                  </i>
                </span>
              );
            })
          }
        </div>

      </div>
    );
  }
}

export default TimeProcess;