import React from 'react';
import style from './Text.scss';


const Text = props => {
  let onchange = (e) => {
    try {
      props.onChange({
        [e.target.name]: e.target.value
      });
    } catch (error) {
      console.log(error);
    }
  };
  let onFocus = (e) => {
    try {
      props.onFocus(e);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span className={style.wrap}>
      <input
        type={'text'}
        name={props.name}
        onFocus={e => onFocus(e)}
        value={props.checkMsg ? '' : props.value}
        defaultValue={props.defaultValue}
        placeholder={props.checkMsg || props.placeholder}
        className={props.checkMsg && style.error}
        style={{ 'width': `${props.width}px` }}
        onChange={e => onchange(e)}
      />
    </span>);
};
export default Text;