import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import style from './index.scss';
// import { config, path, ajax } from 'CONFIG/config';

class ImgItem extends Component {
  render() {
    const { src, del, add, change, svg } = this.props;
    return (
      <div className={style.imgItem}>
        <div className={`${style.box} ${src && style.noBorder}`}>
          {src ? <SVGInline className={style.del} svg={require('./btn_delete.svg')} onClick={del} /> : null}
          {
            src
              ? <img src={src} onClick={change} />
              : <SVGInline svg={svg || require('./icon_camera.svg')} className={style.add} onClick={add} />
          }
        </div>
      </div>
    );
  }
}
export { ImgItem };
class ImgUpload extends Component {
  state={
    newPhotoAlbumPic: [],
    pics: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        pics: nextProps.value
      });
    }
  }

  wxChooseImage= (index) => {
    const { sourceType } = this.props;
    const { pics } = this.state;
    let _this = this;
    wx.chooseImage({
      count: index ? 1 : (9 - pics.length), // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        _this.wxUploadImage(localIds, index);
      }
    });
  }

  wxUploadImage = (localIds, index) => {
    const _this = this;
    const ids = localIds;
    const id = ids.pop();
    if (id) {
      wx.uploadImage({
        localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          let serverId = res.serverId; // 返回图片的服务器端ID
          if (ids.length !== 0) {
            _this.wxUploadImage(ids);
          }
          _this.uploadImage(serverId, id, index);
        }
      });
    }
  }

  uploadImage = (serverId, id, index) => {
    const _this = this;
    const data = new FormData();
    const { ajax, path, onChange, module, needMediaId } = this.props;
    // data.append('mediaid', serverId);
    // data.append('accesstoken', sessionStorage.getItem('access_token'));
    // data.append('module', module);
    // data.append('file-type', 'jpg');
    ajax({
      method: 'post',
      url: `${path}`,
      params: {
        mediaid: serverId,
        module: module,
        appid: sessionStorage.getItem('APPID'),
        convert: true
      }
    }).then(res => {
      if (res.data.key) {
        const { newPhotoAlbumPic, pics } = _this.state;
        if (index) { // 修改
          pics[index] = res.data.key;
        } else { // 新增
          pics.push(
            res.data.key
          );
        }

        newPhotoAlbumPic.push({
          base64_url: id,
          pic_url: res.data.key,
          album_pic_des: '',
          cover_pic: 0,
          // album_id: parseInt(_this.props.match.params.id, 10),
          is_uploading: false,
          is_success: true
        });
        _this.setState({
          newPhotoAlbumPic,
          pics
        });
        onChange && onChange(pics, index ? 'change' : 'add', index);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  delImage=(index) => {
    const { pics } = this.state;
    const { onChange } = this.props;
    pics.splice(index, 1);
    this.setState({
      pics: pics
    });
    onChange && onChange(pics, 'del', index);
  }

  render() {
    const { pics } = this.state;
    const {
      srcBefore,
      srcAfter,
      value
    } = this.props;
    let midPics = value ? value : pics;
    return (
      <div className={style.wrap}>
        {
          midPics.length > 0
          && midPics.map(
            (ele, index) =>
              <ImgItem
                src={(srcBefore || '') + ele + (srcAfter || '')}
                key={index}
                del={() => this.delImage(index)}
                change={() => this.wxChooseImage(index)}
              />
          )
        }
        {
          pics.length < 9
          &&
          <ImgItem
            add={() => this.wxChooseImage()}
          />
        }
      </div>
    );
  }
}


export default ImgUpload;