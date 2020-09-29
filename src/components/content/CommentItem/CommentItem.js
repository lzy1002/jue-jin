import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./CommentItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import {publishDate, levelIcon, defaultAvatar} from "../../../assets/js/utils.js";

class CommentItem extends React.Component {
  static defaultProps = {
    commentItemData: {}
  };

  static propTypes = {
    commentItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleUserBoxClick(commentItemData) {
    this.props.history.push(`/user/${commentItemData.user_info.user_id}`);
  }

  handleThumbClick(commentId) {
    this.props.changeCommentThumbState(commentId);
  }

  isThumb(commentId, thumbCount) {
    const index = this.props.commentThumbList.findIndex(item => item === commentId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      return thumbCount;
    }
  }

  thumbIsActive(commentId) {
    const index = this.props.commentThumbList.findIndex(item => item === commentId);
    return index !== -1;
  }

  render() {
    return (
      <div className="commentItem-wrapper border-1px">
        <div className="commentItem-header">
          <div className="user-box" onClick={this.handleUserBoxClick.bind(this, this.props.commentItemData)}>
            <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.props.commentItemData.user_info.avatar_large)})`}}></div>
            <div className="user-info">
              <p className="username">
                <span><span>{this.props.commentItemData.user_info.user_name}</span>{this.props.commentItemData.is_author ? <span>(作者)</span> : undefined}</span>
                <img src={levelIcon(this.props.commentItemData.user_info.level)} alt=""/>
              </p>
              <p className="job">
                {this.props.commentItemData.user_info.job_title ?
                  <span>{this.props.commentItemData.user_info.job_title} · </span>
                : undefined}
                <span>{publishDate(this.props.commentItemData.comment_info.ctime * 1000)}</span>
              </p>
            </div>
          </div>
          <div className="option-box">
            <div className={`like ${this.thumbIsActive.call(this, this.props.commentItemData.comment_id) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.commentItemData.comment_id)}>
              <i className={`iconfont ${this.thumbIsActive.call(this, this.props.commentItemData.comment_id) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
              <span className="count">{this.isThumb.call(this, this.props.commentItemData.comment_id, this.props.commentItemData.comment_info.digg_count)}</span>
            </div>
            <div className="comment">
              <i className="iconfont icon-pinglun"></i>
            </div>
          </div>
        </div>

        <div className="commentItem-content">
          <p className="user-comment">{this.props.commentItemData.comment_info.comment_content}</p>
          {this.props.commentItemData.reply_infos && this.props.commentItemData.reply_infos.length ?
            <ul className="reply">
              {this.props.commentItemData.reply_infos.map((item, index) => (
                <li key={item.reply_id} className="reply-item">
                  <span><span className="username">{item.user_info.user_name}{item.is_author ? <span>(作者)</span> : undefined}</span> {index !== 0 && item.reply_user.user_name ? <span><span> 回复 </span><span className="username">{item.reply_user.user_name}</span></span> : undefined}: &nbsp;&nbsp;&nbsp;</span>
                  <span>{item.reply_info.reply_content}</span>
                </li>
              ))}
            </ul>
          : undefined}
        </div>

      </div>
    )
  }

}

export default connect(state => ({...state.profile.commentThumb}), {...actionCreator.profile})(withRouter(CommentItem));
