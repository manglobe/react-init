/* jshint esversion: 6 */
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { notify } from '../Toast';
import SVG from 'react-svg-inline';
import style from './assets/newComment.scss';
const cs = classnames.bind(style);

class NewComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEmoji: false,
      content: '',
      count: 0,
      isAnonymity: false,
      autoFocus: false,
    };
    this.handleEmoji = this.handleEmoji.bind(this);
    this.toggleEmoji = this.toggleEmoji.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleAnonymity = this.toggleAnonymity.bind(this);
    this.selectPos = this.selectPos.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      window.scrollTo(0, 0);
      this.setState({
        autoFocus: true
      });
      this.textarea.focus();
      document.getElementById('commentBox').focus();
    }
    this.setState({
      content: '',
      count: 0,
      isEmoji: false,
      isAnonymity: false,
      curInputPos: 0,
    });
  }

  handleEmoji(e) {
    const { content, curInputPos } = this.state;
    if (content.length > 500) {
      notify.show('最多输入500字');
      return;
    }
    const contents = content.substr(0, curInputPos) + e.target.dataset.title + content.substr(curInputPos);
    this.setState({
      content: contents,
      count: content.length,
      curInputPos: curInputPos + e.target.dataset.title.length
    });
  }

  toggleEmoji() {
    this.setState({
      isEmoji: !this.state.isEmoji,
    });
  }

  toggleAnonymity() {
    this.setState({
      isAnonymity: !this.state.isAnonymity,
    });
  }

  handleInput(e) {
    const content = e.target.value.trim();
    if (content.length > 500) {
      notify.show('最多输入500字');
      return;
    }
    this.setState({
      content: content,
      count: content.length,
      curInputPos: e.target.selectionStart
    });
  }

  selectPos(e) {
    console.log(e.target.selectionStart);
    this.setState({
      curInputPos: e.target.selectionStart
    });
  }

  render() {
    const { isEmoji, content, count, isAnonymity, autoFocus } = this.state;

    const { show = false, onClose, sendComment, replayName } = this.props;
    return (
      <div className={cs('wrap', { on: show })}>
        <div className={style.input}>
          <textarea id="commentBox" autoFocus={autoFocus} ref={(input) => this.textarea = input} onClick={this.selectPos} onInput={this.handleInput} placeholder={replayName ? `@${replayName}` : '说点什么吧...'} value={content}></textarea>
        </div>
        <div className={cs('bar')}>
          <ul className={cs('dflex')}>
            <li onClick={this.toggleEmoji} className={cs('emoji', { on: isEmoji })}><SVG svg={require('IMG/btn_add_emoji_h.svg')} className={style.emoji} /></li>
            {/* <li onClick={this.toggleAnonymity} className={cs('anonymity', {on: isAnonymity})}>匿名</li> */}
            <li className={cs('flex1', 'count')}>{count || 0}/500</li>
            <li onClick={onClose} className={style.btn}><a className={style.cancle}>取消</a></li>
            <li onClick={() => sendComment(content, isAnonymity)} className={style.btn} data-optlog={374}><a className={style.send}>确定</a></li>
          </ul>
        </div>
        <div className={cs('emojiWrap', { on: isEmoji })}>
          <div className={style.emojis} onClick={this.handleEmoji}>
            <ul className="clearfix">
              <li data-title="[大笑]" className="emoji001"></li>
              <li data-title="[撇嘴]" className="emoji002"></li>
              <li data-title="[色]" className="emoji003"></li>
              <li data-title="[发呆]" className="emoji004"></li>
              <li data-title="[得意]" className="emoji005"></li>
              <li data-title="[流泪]" className="emoji006"></li>
              <li data-title="[害羞]" className="emoji007"></li>
              <li data-title="[闭嘴]" className="emoji008"></li>
              <li data-title="[睡]" className="emoji009"></li>
              <li data-title="[委屈]" className="emoji010"></li>
              <li data-title="[冷汗]" className="emoji011"></li>
              <li data-title="[发怒]" className="emoji012"></li>
              <li data-title="[调皮]" className="emoji013"></li>
              <li data-title="[龇牙]" className="emoji014"></li>
              <li data-title="[惊讶]" className="emoji015"></li>
              <li data-title="[难过]" className="emoji016"></li>
              <li data-title="[抠鼻]" className="emoji017"></li>
              <li data-title="[冷汗]" className="emoji018"></li>
              <li data-title="[抓狂]" className="emoji019"></li>
              <li data-title="[吐]" className="emoji020"></li>
              <li data-title="[偷笑]" className="emoji021"></li>

              <li data-title="[阴险]" className="emoji022"></li>
              <li data-title="[鼓掌]" className="emoji023"></li>
              <li data-title="[衰]" className="emoji024"></li>
              <li data-title="[拥抱]" className="emoji025"></li>
              <li data-title="[强]" className="emoji026"></li>
              <li data-title="[爱心]" className="emoji027"></li>
              <li data-title="[蛋糕]" className="emoji028"></li>
              <li data-title="[送礼]" className="emoji029"></li>
              <li data-title="[玫瑰]" className="emoji030"></li>
              <li data-title="[大笑]" className="emoji031"></li>
              <li data-title="[露齿笑]" className="emoji032"></li>
              <li data-title="[破涕为笑]" className="emoji033"></li>
              <li data-title="[开怀大笑]" className="emoji034"></li>
              <li data-title="[笑脸]" className="emoji035"></li>
              <li data-title="[冷汗]" className="emoji036"></li>
              <li data-title="[白笑脸]" className="emoji037"></li>
              <li data-title="[眨眼]" className="emoji038"></li>
              <li data-title="[舒服]" className="emoji039"></li>
              <li data-title="[花心]" className="emoji040"></li>
              <li data-title="[帅气]" className="emoji041"></li>
              <li data-title="[假笑]" className="emoji042"></li>

              <li data-title="[鄙视]" className="emoji043"></li>
              <li data-title="[恶魔]" className="emoji044"></li>
              <li data-title="[紧张]" className="emoji045"></li>
              <li data-title="[思考]" className="emoji046"></li>
              <li data-title="[困惑]" className="emoji047"></li>
              <li data-title="[飞吻]" className="emoji048"></li>
              <li data-title="[亲亲]" className="emoji049"></li>
              <li data-title="[调皮]" className="emoji050"></li>
              <li data-title="[吐舌头]" className="emoji051"></li>
              <li data-title="[生气]" className="emoji052"></li>
              <li data-title="[气愤]" className="emoji053"></li>
              <li data-title="[哭泣]" className="emoji054"></li>
              <li data-title="[胜利]" className="emoji055"></li>
              <li data-title="[失望]" className="emoji056"></li>
              <li data-title="[可怕]" className="emoji057"></li>
              <li data-title="[大哭]" className="emoji058"></li>
              <li data-title="[生病]" className="emoji059"></li>
              <li data-title="[吓坏]" className="emoji060"></li>
              <li data-title="[晕倒]" className="emoji061"></li>
              <li data-title="[脸红]" className="emoji062"></li>
              <li data-title="[头晕]" className="emoji063"></li>

              <li data-title="[口罩]" className="emoji064"></li>
              <li data-title="[猴子]" className="emoji065"></li>
              <li data-title="[捂眼]" className="emoji066"></li>
              <li data-title="[捂耳]" className="emoji067"></li>
              <li data-title="[捂嘴]" className="emoji068"></li>
              <li data-title="[不啊]" className="emoji069"></li>
              <li data-title="[好的]" className="emoji070"></li>
              <li data-title="[举手]" className="emoji071"></li>
              <li data-title="[眼睛]" className="emoji072"></li>
              <li data-title="[红唇]" className="emoji073"></li>
              <li data-title="[赞]" className="emoji074"></li>
              <li data-title="[不赞]" className="emoji075"></li>
              <li data-title="[拍手]" className="emoji076"></li>
              <li data-title="[肌肉]" className="emoji077"></li>
              <li data-title="[祈祷]" className="emoji078"></li>
              <li data-title="[月亮黑]" className="emoji079"></li>
              <li data-title="[月亮白]" className="emoji080"></li>
              <li data-title="[狗啊]" className="emoji081"></li>
              <li data-title="[外星人]" className="emoji082"></li>
              <li data-title="[便便]" className="emoji083"></li>
              <li data-title="[干杯]" className="emoji084"></li>

              <li data-title="[礼物]" className="emoji085"></li>
              <li data-title="[庆祝]" className="emoji086"></li>
              <li data-title="[钱]" className="emoji087"></li>
              <li data-title="[下雨]" className="emoji088"></li>
              <li data-title="[气]" className="emoji089"></li>
              <li data-title="[中国]" className="emoji090"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NewComment;
