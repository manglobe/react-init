import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import style from './index.scss';
class Search extends Component {
  render() {
    return (
      <SearchBar {...this.props} placeholder="输入标题搜索" className={`${style.wrap} ${this.props.className}`} />
    );
  }
}

export default Search;