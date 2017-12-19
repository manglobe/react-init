import React, { Component } from 'react';
import { List, Toast, Modal } from 'antd-mobile';
import SVGInline from 'react-svg-inline';
import style from './index.scss';
import sign from '@vj/wx-sign';
import { config, path, ajax } from 'CONFIG/config';
import Pup from 'COMMON/Popup/Pup';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

// const msg = [
//   '请求成功',
//   '参数不能为空',
//   '记录不存在',
//   '数据异常',
//   '当前附件不存在',
//   '获取accessToken失败',
//   '获取人员信息失败'
// ];

const typeObj = {
  pdf: require('IMG/icon_file_pdf.svg'),
  doc: require('IMG/icon_file_word.svg'),
  docx: require('IMG/icon_file_word.svg'),
  txt: require('IMG/icon_file_txt.svg'),
  xls: require('IMG/icon_file_excel.svg'),
  xlsx: require('IMG/icon_file_excel.svg'),
  ppt: require('IMG/icon_file_ppt.svg'),
  rar: require('IMG/icon_file_rar.svg'),
  zip: require('IMG/icon_file_rar.svg'),
  other: require('IMG/icon_file_other.svg')
};

class File extends Component {

  componentDidMount() {
    sign({ jsApiList: ['closeWindow'] });
  }

  fileDownload = (id, key, type) => {
    alert('温馨提示', '附件将推送到应用主界面，确定现在推送并去查看？消息可能会有延时，请耐心等待。', [
      {
        text: '取消',
        style: 'default',
      },
      {
        text: '确定',
        onPress: () => {
          ajax.get(path.download, {
            params: {
              id: id,
              key: key,
              type: type
            }
          }).then(data => { // TODO
            console.log(key);
            if (data.data.success) {
              if (data.data.code === 1) {
                wx.closeWindow();
              } else {
                Toast.info('下载失败', 2);
              }
            }
          }).catch(error => console.log(error));
        }
      },
    ]);
  };

  preView=(key) => {
    const appid =   sessionStorage.getItem('appid');
    const corpid =  sessionStorage.getItem('corpid');
    window.open(`${config.HOST}/file/doc/preview?key=${key}&corpid=${corpid}&appid=${appid}`);
  }
  render() {
    const { title, url, size, type, className, id, uploadType } = this.props;
    return (

      <a className={style.border} >
        <Pup
          data={{
            layerSelect: [
              {
                content: '预览',
                func: () => this.preView(url),
              },
              {
                content: '下载',
                func: () => this.fileDownload(id, url, uploadType),
              }
            ]
          }}>
          <Item
            className={`${style.bgColor} ${className}`}
            arrow="horizontal"
            thumb={<SVGInline svg={typeObj[type] || typeObj.other} className={style.svg} />}
            multipleLine
            onClick={() => {}}
          >
            <span className={style.text}>{title}</span>
            <span><Brief><span className={style.brief}>{(size / 1024 / 1024).toFixed(2)} MB</span></Brief></span>
          </Item>
        </Pup>
      </a>
    );
  }
}


// const File = ({ name, title, url, size, type, className, id }) => (
//   <a className={style.border} onClick={() => fileDownload(id, url)}>
//     <Item
//       className={`${style.bgColor} ${className}`}
//       arrow="horizontal"
//       thumb={<SVGInline svg={typeObj[type] || typeObj.other} className={style.svg} />}
//       multipleLine
//       onClick={() => {}}
//     >
//       <span className={style.text}>{name || title}</span>
//       <span><Brief><span className={style.brief}>{(size / 1024 / 1024).toFixed(2)} MB</span></Brief></span>
//     </Item>
//   </a>
// );

export default File;