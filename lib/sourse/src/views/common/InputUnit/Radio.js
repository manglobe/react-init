import React from 'react';
import style from './Radio.scss';

const Radio = props => {
  let onchange = (e) => {
    try {
      e.target.checked && props.onChange({
        [e.target.name]: e.target.value
      });
    } catch (error) {
      console.log(error);
    }

  };
  switch (props.type) {
    case 'dot':
      return (
        <span className={style.wrap}>
          {props
            .content
            .map((ele, index) => <label key={index}>
              <i
                className={`${style.item} ${props.value[index] == props.active && style.active}`}
                style={{
                  'backgroundColor': `${props.bg}`,
                  'width': `${props.size}`,
                  'height': `${props.size}`
                }}></i>
              <input type="radio" name={props.name} value={props.value[index]} onClick={(e) => onchange(e)} />
              <span className={style.content}>{ele}
                <i className={style.point} >{props.point && props.point[index]}</i>
              </span>
            </label>)
          }
        </span>
      );
      break;
    default:
      return (
        <span className={style.wrap}>
          {props
            .content
            .map((ele, index) => <label key={index}>
              <i
                className={`${style.item} ${props.value[index] == props.active && style.active}`}
                style={{
                  'backgroundColor': `${props.bg}`,
                  'width': `${props.size}`,
                  'height': `${props.size}`
                }}></i>
              <input type="radio" name={props.name} value={ele.value[index]} />
              <span className={style.content}>{ele}</span>
            </label>)
          }
        </span>
      );
      break;
  }

};

export default Radio;