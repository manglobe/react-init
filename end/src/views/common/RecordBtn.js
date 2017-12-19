import React from 'react';
import classnames from 'classnames/bind';
import {notify} from 'Toast';
import {config, path, ajax} from 'config/config';
import style from '../style/VoiceRecord.scss';
import AudioBox from '../H5/H5_modules/AudioBox';

const IOSBtn = props => (
  <div className={style.recorder}>
    <span>按住</span>
    <i className="icon vj vj-record"></i>
    <span>说话</span>
    <button
      className={classnames(style.recordBtn, props.isRecording
      ? style.active
      : null)}
      onTouchStart={(e) => props.startRecord(e)}
      onTouchEnd={(e) => props.endRecord(e)}></button>
  </div>
)
const AndroidBtn = props => (
  <div className={style.recorder}>
    <span>{props.isRecording
        ? '停止'
        : '点击'}</span>
    <i className="icon vj vj-record"></i>
    <span>{props.isRecording
        ? '录音'
        : '说话'}</span>
    <button
      className={classnames(style.recordBtn, props.isRecording
      ? style.active
      : null)}
      onMouseUp={(e) => props.isRecording
      ? props.endRecord(e)
      : props.startRecord(e)}></button>
  </div>
)

class RecordBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIOS: true,
      isRecording: false
    }
  }
  componentWillMount() {
    const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    this.setState({isIOS: true})
  }
  t=0
  startRecord = (e) => {
    e.persist()
    e&&e.stopPropagation();
    e&&e.preventDefault()
    let _this=this
    const {startRecord} = this.props;
    this.t=setTimeout(function() {
      _this.setState({isRecording: true});
      startRecord && startRecord(e)
    }, 300);
  }
  endRecord = (e) => {
    const {endRecord} = this.props
    this.setState({isRecording: false})
    clearTimeout(this.t)
    endRecord && endRecord(e)
  }
  render() {
    const {isIOS, isRecording} = this.state
    return (isIOS
      ? <IOSBtn
          startRecord={this.startRecord}
          endRecord={this.endRecord}
          isRecording={isRecording}/>
      : <AndroidBtn
        startRecord={this.startRecord}
        endRecord={this.endRecord}
        isRecording={isRecording}/>);
  }
}
//播放
class ReRecordBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      current: 0,
      isPlay: false
    }
  }
  componentWillMount() {
    const {duration, current} = this.props
    this.setState({duration: duration})
  }
  remainingTimeFun = () => {
    const {duration, current} = this.state
    if (duration <= current / 1000) {
      this.stop();
      return 
    }
    this.setState({
      current: current + 40
    });
  }

  timer = {
    t: 0,
    clean: () => {
      clearInterval(this.timer.t)
    },
    set: () => {
      this.timer.t = setInterval(this.remainingTimeFun, 40)
    }
  }

  play = () => {
    const {play} = this.props
    play && play()

    if (this.state.isPlay) {
      this
        .timer
        .clean()
    } else {
      this
        .timer
        .set()
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  stop = () => {
    this
    .timer
    .clean()
    this.setState({isPlay: false, current: 0})
  }
  componentWillReceiveProps(nextProps) {
    nextProps.playStatus==='stop'&&this.stop()
  }
  render() {
    const timeLineFunc = (cur, dur) => `${cur / dur * 100 - 100}%`
    const {isPlay, current, duration} = this.state
    const {rerecord} = this.props
    return (
      <div className={style.player} onClick={this.play}>
        {isPlay
          ? <i className="icon vj vj-pause"></i>
          : <i className="icon vj vj-play"></i>
}
        <div className={style.info}>
          <p className={style.title}>语音</p>
          <div className={style.bar}>
            <div
              className={style.line}
              style={{
              transform: `translate(${timeLineFunc(this.state.current, this.state.duration * 1000)})`
            }}></div>
          </div>
          <div className={style.timer}>
            <span>{`00:${current >= 10000
                ? parseInt(current / 1000)
                : `0${parseInt(current / 1000)}`}`}</span>
            <span>{`00:${duration >= 10
                ? duration
                : `0${duration}`}`}</span>
          </div>
        </div>
        <button onClick={rerecord}>重录</button>
      </div>
    )
  }
}
export {RecordBtn, ReRecordBtn};