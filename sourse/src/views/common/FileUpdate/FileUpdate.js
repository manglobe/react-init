import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import style from './index.scss';
import { Toast } from 'antd-mobile';

const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

const typeObj = {
  pdf: require('./icon_file_pdf.svg'),
  doc: require('./icon_file_word.svg'),
  docx: require('./icon_file_word.svg'),
  txt: require('./icon_file_txt.svg'),
  xls: require('./icon_file_excel.svg'),
  xlsx: require('./icon_file_excel.svg'),
  ppt: require('./icon_file_ppt.svg'),
  rar: require('./icon_file_rar.svg'),
  zip: require('./icon_file_rar.svg'),
  other: require('./icon_file_other.svg')
};


class FileItem extends Component {
  render() {
    const { url, type, del, onChange, svg, onClick } = this.props;
    return (
      <div className={style.fileItem}>
        <div className={style.box}>
          <div className={style.fileBox}>
            <input type="file" onChange={onChange} onClick={onClick} />
          </div>
          {url ? <SVGInline className={style.del} svg={require('./btn_delete.svg')} onClick={del} /> : null}
          {
            url
              ? <SVGInline svg={typeObj[type] || typeObj.other} />
              : <SVGInline svg={svg || require('./icon_file.svg')} className={style.add} />
          }
        </div>
      </div>
    );
  }
}

class FileUpdate extends Component {
  state={
    files: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        files: nextProps.value
      });
    }
  }
  uploadFile=(e, index) => {
    const _this = this;
    const { files } = this.state;
    const { ajax, path, onChange } = this.props;
    let data = new FormData();
    let fileData = e.target.files[0];
    data.append('file', fileData);
    data.append('module', 'meet');

    ajax.post(path, data).then(res => {
      if (res.data.msg) {
        index
          ? files[index] = res.data.msg  // 修改
          : files.push(  // 新增
            {
              url: res.data.msg,
              size: fileData.size,
              title: fileData.name,
              type: fileData.name.match(/^.*\.(.*)$/)[1]
            }
          );
        _this.setState({
          files
        });
        onChange && onChange(files, index ? 'change' : 'add', index);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  delFile=(index) => {
    const { files } = this.state;
    const { onChange } = this.props;
    files.splice(index, 1);
    this.setState({
      pics: files
    });
    onChange && onChange(files, 'del', index);
  }
  click=(e) => {

    if (isIOS) {
      e.preventDefault();
      Toast.info('IOS设备不支持文件上传');
    }
  }

  render() {
    const { files } = this.state;
    const {
      srcBefore,
      srcAfter,
      value
    } = this.props;
    let midFile = value ? value : files;
    return (
      <div className={style.wrap} onClick={this.click} >
        {
          midFile.length > 0
          && midFile.map(
            (ele, index) =>
              <FileItem
                url={(srcBefore || '') + ele.url + (srcAfter || '')}
                type={ele.type}
                key={index}
                del={() => this.delFile(index)}
                onChange={(e) => this.uploadFile(e, index)}
                onClick={this.click}
              />
          )
        }
        {
          midFile.length < 1
          &&
          <FileItem
            onChange={this.uploadFile}
          />
        }
      </div>
    );
  }
}

export default FileUpdate;