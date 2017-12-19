/* jshint esversion: 6 */
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import LazyLoad from 'react-lazy-load';
import { Toast } from 'antd-mobile';

import Confirm from '../Confirm';
import NewComment from './newComment';
import Prise from './Prise';
import Like from './Like';
import Emoji from 'CONFIG/emoji';
import SVG from 'react-svg-inline';
import svgLoading from 'IMG/loading.svg';

import style from './assets/Comments.scss';
const cs = classnames.bind(style);

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curTab: 'comments',
      showInput: false,
      curScrollTop: 0,
      comments: [],
      prises: [],
      curPersonId: 0,
      curCommentsId: 0,
      isShowDelConfirm: false,
      replayPersonId: 0,
      replayName: '',
      commentsId: 0,
      rootId: 0,
      isReplay: false,
    };
    this.tab = this.tab.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.openInputBox = this.openInputBox.bind(this);
    this.closeInputBox = this.closeInputBox.bind(this);
    this.delComments = this.delComments.bind(this);
    this.doDelComments = this.doDelComments.bind(this);
    this.reomveDeletedComments = this.reomveDeletedComments.bind(this);
    this.newReply = this.newReply.bind(this);
    this.insertNewComments = this.insertNewComments.bind(this);
    this.showMore = this.showMore.bind(this);
    this.toggleNewPrise = this.toggleNewPrise.bind(this);
  }

  componentDidMount() {
    const { comments, prises } = this.props;
    this.setState({
      comments,
      prises
    });
  }

  componentWillReceiveProps(nextProps) {
    const { comments, prises, delCommentsResult, newCommentsResult, } = nextProps;
    this.setState({
      comments,
      prises
    });

    if (!newCommentsResult.isFetching) {
      if (newCommentsResult.person_id) {
        if (this.props.newCommentsResult.hash != nextProps.newCommentsResult.hash) {
          Toast.info('发表成功');
          this.insertNewComments(newCommentsResult.commentRecord[0]);
        }
      } else {
        Toast.info('发表失败');
      }
    }
    if (!delCommentsResult.isFetching && this.props.delCommentsResult.id != nextProps.delCommentsResult.id) {
      if (delCommentsResult.success) {
        Toast.info('删除成功');
        this.reomveDeletedComments(nextProps.delCommentsResult.id);
      } else {
        Toast.info('删除失败');
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.showInput && prevState.showInput) {
      window.scrollTo(0, this.state.curScrollTop);
    }
  }

  tab(tab) {
    if (tab == this.state.curTab) {
      return;
    }
    this.setState({
      curTab: tab
    });
  }

  sendComment(content, isAnonymity) {
    const { isReplay, replayPersonId, commentsId, rootId } = this.state;
    if (content.length === 0) {
      Toast.info('请输入评论内容');
      return;
    }
    this.closeInputBox();
    this.props.sendComment(content, isAnonymity, isReplay, replayPersonId, commentsId, rootId);
  }

  openInputBox() {
    const curScrollTop = window.scrollY || 0;
    this.setState({
      showInput: true,
      replayName: '',
      curScrollTop
    });
  }

  closeInputBox() {
    this.setState({
      showInput: false
    });
  }

  delComments(id) {
    this.setState({
      isShowDelConfirm: true,
      curCommentsId: id,
    });
  }

  doDelComments() {
    this.props.delComments(this.state.curCommentsId);
  }

  reomveDeletedComments(id) {
    const { comments } = this.state;
    let list = comments.commentRecord;
    list.forEach((item, index) => {   // TODO 循环跳出
      if (item.id == id) {
        list.splice(index, 1);
        // return false;
      }
      if (item.childCommentRecord) {
        item.childCommentRecord.forEach((items, indexs) => {
          if (items.id == id) {
            item.childCommentRecord.splice(indexs, 1);
          }
        });
      }
    });
    comments.commentRecord = list;
    this.setState({
      comments
    });
  }

  insertNewComments(item) {
    // console.log(item);
    const { comments } = this.state;
    let list = comments.commentRecord ? comments.commentRecord : comments.commentRecord = [];
    if (item.comment_path == '0') {
      list.unshift(item);
    } else {
      const parentId = item.comment_path.split('-')[1];
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].id == parentId) {
          list[i].childCommentRecord ? list[i].childCommentRecord.unshift(item) : list[i].childCommentRecord = [item];
        }
      }
    }
    comments.commentRecord = list;
    this.setState({
      comments,
      isReplay: false
    });
  }


  newReply(id, person_id, name, rootId) {
    // console.log(id, person_id, name);
    this.openInputBox();
    this.setState({
      isReplay: true,
      replayPersonId: person_id,
      replayName: name,
      commentsId: id,
      rootId,
    });
  }

  emojiFitter(content) {
    const exep = /\[[\u4e00-\u9fa5]{1,4}\]/g;
    return content.replace(exep, (value) => {
      for (let key in Emoji) {
        if (Emoji[key] == value) {
          return `<i class="${key}"></i> `;
        }
      }
    });
  }

  showMore(id) {
    this.refs[`ct${id}`].className = '';
  }

  toggleNewPrise(item) {
    // console.log(item);
    let { prises } = this.state;
    let list = prises.priseRecord ? prises.priseRecord : prises.priseRecord = [];
    if (item.status == 1) {
      list.unshift(item);
    } else {
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].id == item.id) {
          list.splice(i, 1);
          break;
        }
      }
    }
    prises.priseRecord = list;
    this.setState({
      prises,
    });
  }

  gotoComments = () => {
    document.getElementById('comments').scrollIntoView();
  }

  toggleLike = () => {
    console.log('toggle like');
  }

  render() {
    const {
      curTab,
      showInput,
      replayName,
      curScrollTop,
      comments,
      prises,
      isShowDelConfirm,
      curCommentsId,
    } = this.state;

    const { commentRecord = [], total_count = 0, person_id = 0, } = comments;
    const { priseRecord = [], total_count: prises_total = 0, } = prises;
    const Loading = () => (
      <div className="loading"><i><SVG svg={svgLoading} width={'40'} height={'40'}></SVG></i></div>
    );

    if (comments.isFetching) {
      return <Loading />;
    }

    return (
      <div className={style.wrap}>
        <Confirm
          show={isShowDelConfirm}
          msg="您确定要删除这条评论吗？"
          onOk={this.doDelComments}
          onClose={() => this.setState({ isShowDelConfirm: false })}
        />
        <div id="comments" className={style.ct}>
          <ul className={cs('clearfix', 'nav')}>
            <li
              onClick={() => this.tab('comments')}
              className={cs({ cur: curTab == 'comments' ? true : false })}
            >
              评论({commentRecord.length || 0})
            </li>
            {/* <li
              onClick={()=>this.tab('like')}
              className={cs({cur: curTab == 'like' ? true : false})}
            >
              赞({priseRecord.length || 0})
            </li> */}
          </ul>
          <div className={cs('bd', { on: curTab == 'comments' ? true : false })}>
            {
              commentRecord.length ? commentRecord.map((item, index) => (
                <div className={style.itemsWrap} key={index} data-id={item.id} ref={`ct${item.id}`}>
                  <div className={cs('dflex', 'dflexs', 'items')}>
                    <LazyLoad width={30} height={30}>
                      {
                        item.is_anonymous && item.is_anonymous == 1 ?
                          <span className="defaultHeadImg"></span>
                          :
                          item.person_logo ?
                            <img src={item.person_logo} alt="" />
                            :
                            <span className="defaultHeadImg"></span>
                      }
                    </LazyLoad>
                    <div className={cs('flex1', 'itemBd')}>
                      <p className={style.name}>{item.is_anonymous && item.is_anonymous == 1 ? '匿名' : item.person_name}</p>
                      <p className={style.time}>{item.create_time}</p>
                      <p className={style.cont} dangerouslySetInnerHTML={{ __html: this.emojiFitter(item.comment_content) }}></p>
                    </div>
                    {
                      person_id == item.person_id
                        ? <SVG svg={require('IMG/comt_btn_delete.svg')} onClick={() => this.delComments(item.id)} className={style.icon_delete} />
                        : <SVG svg={require('IMG/comt_btn_comment.svg')}
                          onClick={() => this.newReply(item.id, item.person_id, item.is_anonymous && item.is_anonymous == 1 ? '匿名' : item.person_name, item.id)}
                          className={style.icon_comment2}
                        />

                        // <i 
                        // onClick={() => this.newReply(item.id, item.person_id, item.is_anonymous && item.is_anonymous == 1 ? '匿名' : item.person_name, item.id)} 
                        // className="icon vj vj-comment"></i>
                    }
                  </div>
                  {
                    item.childCommentRecord ?
                      item.childCommentRecord.map((replay, index) => (
                        <div key={index} className={cs('dflex', 'dflexs', 'items', 'subitem')}>
                          <LazyLoad width={30} height={30}>
                            {
                              replay.is_anonymous && replay.is_anonymous == 1 ?
                                <span className="defaultHeadImg"></span>
                                :
                                replay.person_logo ?
                                  <img src={replay.person_logo} alt="" />
                                  :
                                  <span className="defaultHeadImg"></span>
                            }
                          </LazyLoad>
                          <div className={cs('flex1', 'itemBd')}>
                            <p className={style.name}>
                              {
                                replay.is_anonymous && replay.is_anonymous == 1 ?
                                  '匿名'
                                  :
                                  replay.person_name
                              }
                              <span className={style.tips}>回复</span>
                              {replay.reply_person_name || ''}
                            </p>
                            <p className={style.time}>{replay.create_time}</p>
                            <p className={style.cont} dangerouslySetInnerHTML={{ __html: this.emojiFitter(replay.comment_content) }}></p>
                          </div>
                          {
                            person_id != item.person_id
                              ? <SVG svg={require('IMG/comt_btn_delete.svg')} onClick={() => this.delComments(item.id)} className={style.icon_delete} />
                              : <SVG svg={require('IMG/comt_btn_comment.svg')}
                                onClick={() => this.newReply(item.id, item.person_id, item.is_anonymous && item.is_anonymous == 1 ? '匿名' : item.person_name, item.id)}
                                className={style.icon_comment2}
                              />
                          }
                        </div>
                      ))
                      : null
                  }
                  {
                    item.childCommentRecord ?
                      item.childCommentRecord.length > 4 ?
                        <div onClick={() => this.showMore(item.id)} className={style.more}>展开更多回复</div>
                        : null
                      : null
                  }
                </div>
              ))
                : <div className={style.empty}>
                  <div className={style.img}></div>
                  <p>沙发还在，快来抢啊…</p>
                </div>
            }
          </div>

          <div className={cs('bd', { on: curTab == 'like' ? true : false })}>
            {
              priseRecord && priseRecord.length !== 0 ?
                priseRecord.map((item, index) => (
                  <div className={cs('dflex', 'dflexs', 'items')} key={index}>
                    <LazyLoad width={30} height={30}>
                      {
                        item.person_logo ?
                          <img src={item.person_logo} alt="" />
                          :
                          <span className="defaultHeadImg"></span>
                      }
                    </LazyLoad>
                    <div className={cs('flex1', 'itemBd')}>
                      <p className={style.name}>{item.person_name}</p>
                      <p className={style.time}>{item.create_time}</p>
                    </div>
                  </div>
                ))
                : <div className={style.empty}>
                  <div className={style.imgGood}></div>
                  <p>喜欢就点个赞吧~</p>
                </div>
            }
          </div>

          <div className={cs('dflex', 'ft')}>
            <a onClick={this.openInputBox} className="flex1" data-optlog={373}><SVG svg={require('IMG/icon_edit.svg')} className={style.editor_icon} />说点什么吧...</a>
            <div className={style.ctCountWrap}>
              <span className={style.ctIcon} onClick={this.gotoComments}>
                {/* <i className="icon vj vj-comment1"></i> */}
                <SVG svg={require('IMG/icon_comment.svg')} className={style.icon_comment} />
                {
                  (commentRecord.length || 0) != 0 ?
                    <i className={style.ctCount}>{commentRecord.length}</i>
                    :
                    null
                }
              </span>
            </div>
            {/* <Prise
              match={this.props.match}
              togglePrise={this.toggleNewPrise}
            /> */}
            {/* <Like 
              match={this.props.match}
              toggleLike={this.toggleLike}
            /> */}
          </div>

          <NewComment
            show={showInput}
            onClose={this.closeInputBox}
            replayName={replayName}
            sendComment={(content, isAnonymity) => this.sendComment(content, isAnonymity)}
          />
        </div>
      </div>
    );
  }
}

export default Comments;
