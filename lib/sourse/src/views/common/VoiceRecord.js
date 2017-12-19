/*jshint esversion: 6*/
import React from 'react';
import classnames from 'classnames/bind';
import {notify} from 'Toast';
import {config, path, ajax} from 'config/config';
import style from '../style/VoiceRecord.scss';
import AudioBox from '../H5/H5_modules/AudioBox';
import {RecordBtn,ReRecordBtn} from './RecordBtn';
import {sign} from '../../sign'
const cs = classnames.bind(style);

 

class VoiceRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isRecord: this.props.isRecord,
      playStatus: 'stop',
      audio:''
    };
    this.rerecord = this
      .rerecord
      .bind(this);
    this.startRecord = this
      .startRecord
      .bind(this);
    this.endRecord = this
      .endRecord
      .bind(this);
    this.play = this
      .play
      .bind(this);
  }

  componentDidMount() {
    let _this = this;
    sign.create(location.href)
  }
  rerecord(e) {
    let _this = this;        
    e&&e.stopPropagation();
    e&&e.preventDefault()
    wx.pauseVoice({
      localId: this.state.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
    });
    this.setState({isPlay: false})
    _this.props.upLoad(false)
    _this.props.changeIsRecord&&_this.props.changeIsRecord(true)
    _this.props.callBack&&_this.props.callBack(``)
    
  }

  startRecord(e) {
    let _this = this;    
    e&&e.stopPropagation();
    e&&e.preventDefault()
    const {accesstoken} = this.props;    
    this.startTime = new Date().getTime();
    wx.startRecord();
    _this.props.changeIsRecord&&_this.props.changeIsRecord(true)
    wx.onVoiceRecordEnd({
      // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      complete: function (res) {
        var localId = res.localId;
        _this.props.upLoad(true)
        wx.uploadVoice({
          localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回音频的服务器端ID
            _this.setState({serverId: serverId})
            ajax({
                method: 'post',
                url: `${path.uploadAudio}`,
                params: {
                  mediaid: serverId,
                  accesstoken: accesstoken,
                  module: 'care',
                  'file-type': 'amr',
                  convert:true
                }
              }).then(function (res) {
              _this.setState({audio: `${config.AUDIO_PATH}${res.data.key}`})
              _this.props.callBack&&_this.props.callBack(`${res.data.key}`)
              _this.props.upLoad(false)
              
            })
          }
        });    
        _this.setState({ localId: localId, isPlay: false,duration:60000})
        _this.props.changeIsRecord&&_this.props.changeIsRecord(false)
    
        notify.show('录音自动结束');
      }
    });
  }

  endRecord(e) {
    e&&e.stopPropagation();
    e&&e.preventDefault()
    if(!this.startTime){
      return false
    }
    let _this = this;
    const duration = new Date().getTime() - this.startTime;
    this.startTime = false;    
    const {accesstoken} = this.props
    if (duration < 700) {
      wx.stopRecord()
      notify.show('录音时间太短');
      return false;
    }
    wx.stopRecord({
      success: function (res) {
        var localId = res.localId;
        _this.props.upLoad(true)
        wx.uploadVoice({
          localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回音频的服务器端ID
            _this.setState({serverId: serverId})
            ajax({
                method: 'post',
                url: `${path.uploadAudio}`,
                params: {
                  mediaid: serverId,
                  accesstoken: accesstoken,
                  module: 'care',
                  'file-type': 'amr',
                  convert:true
                }
              }).then(function (res) {
              _this.setState({audio: `${config.IMG_PATH}${res.data.key}`})
              _this.props.callBack&&_this.props.callBack(`${res.data.key}`)
              // notify.show('录音保存完成');
              _this.props.upLoad(false)
            })
          }
        });
        _this.setState({localId: localId, isPlay: false,duration:duration})
        _this.props.changeIsRecord&&_this.props.changeIsRecord(false)
        
      }
    });
  }

  play() {
    const {playStatus, localId} = this.state;
    let _this = this
    
    if (playStatus!='play') {
      _this.setState({playStatus: 'play'})
      wx.playVoice({
        localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
      })
      wx.onVoicePlayEnd({
        success: function (res) {
          _this.setState({playStatus: 'stop'}) // 返回音频的本地ID
        }
      });
    } else {
      _this.setState({playStatus: 'pause'})
      wx.pauseVoice({
        localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
      });
    }
  }
  componentWillUnmount() {
    wx.stopRecord()
  }

  render() {
    const {audio, playStatus,duration} = this.state;
    const {isRecord} = this.props;
    return (
      <div className={style.wrap}>
        {isRecord
          ? 
          <RecordBtn startRecord={this.startRecord} endRecord={this.endRecord} isRecord={isRecord}/>
            : 
            <ReRecordBtn duration={Math.round(duration/1000)} rerecord={this.rerecord} play={this.play} playStatus={playStatus}/>
}
      </div>
    );
  }
}

export default VoiceRecord;
