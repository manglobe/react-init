import React, { Component } from 'react';
import { List, ImagePicker } from 'antd-mobile';
import style from './index.scss';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];
class ImgPicker extends Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    const { onChange } = this.props;
    this.setState({
      files,
    });
    onChange && onChange(files, type, index);
  }

  render() {
    const { files } = this.state;
    const { title } = this.props;
    return (
      <span>
        {title && <p className={style.par}>{title}</p>}
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 9}
          style={{ width: '100%', height: '85%' }}
        />
      </span>
    );
  }
}

export default ImgPicker;