import React from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./ArticleItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import {ArticleCls} from "../../../assets/js/class.js";
import {defaultAvatar} from "../../../assets/js/utils.js";

class ArticleItem extends React.Component {
  static defaultProps = {
    articleItemData: {}
  };

  static propTypes = {
    articleItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleArticleItemClick(articleItemData) {
    this.props.history.push(`/article/${articleItemData.id || articleItemData.objectId}`);
  }

  handleUserBoxClick(e, articleItemData) {
    if(this.props.location.pathname.startsWith("/user")) {
      if((articleItemData.user.id || articleItemData.user.objectId) === this.props.match.params.userId) {
        e.stopPropagation();
        return;
      }
    }

    this.props.history.push(`/user/${articleItemData.user.id || articleItemData.user.objectId}`);
    e.stopPropagation();  // 阻止合成事件间的事件冒泡
  }

  handleThumbClick(originArticle) {
    console.log(originArticle);
    const article = new ArticleCls(originArticle);
    this.props.changeArticleThumbState(article);
  }

  isThumb(objectId, thumbCount) {
    const index = this.props.articleThumbList.findIndex(item => item.objectId === objectId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      return thumbCount;
    }

  }

  thumbIsActive(objectId) {
    const index = this.props.articleThumbList.findIndex(item => item.objectId === objectId);
    return index !== -1;

  }

  render() {
    return (
      <div className="articleItem-wrapper">
        <div className="articleItem-header">
          <div className="user-box" onClick={e => this.handleUserBoxClick.call(this, e, this.props.articleItemData)}>
            <div className="avatar" style={{backgroundImage: `url(${defaultAvatar(this.props.articleItemData.user.avatarLarge)})`}}></div>
            <span className="username">{this.props.articleItemData.user.username}</span>
          </div>
          <div className="language-box">
            {this.props.articleItemData.tags.slice(0, 2).map((item, index) => (
              <span key={item.id}>{item.title}{index !== this.props.articleItemData.tags.slice(0, 2).length - 1 ? "/" : undefined}</span>
            ))}
          </div>
        </div>
        <div className="articleItem-content" onClick={this.handleArticleItemClick.bind(this, this.props.articleItemData)}>
          <div className="content-left" style={{marginRight: this.props.articleItemData.screenshot ? "24px" : ""}}>
            <h3 className="title">{this.props.articleItemData.title}</h3>
            <div className="text">
              {this.props.articleItemData.content}
            </div>
          </div>
          {this.props.articleItemData.screenshot ? <div className="content-right" style={{backgroundImage: `url(${this.props.articleItemData.screenshot})`}}></div> : undefined}
        </div>
        <div className="articleItem-footer" onClick={e => e.stopPropagation()}>
          <span className={`like ${this.thumbIsActive.call(this, this.props.articleItemData.id || this.props.articleItemData.objectId) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.articleItemData)}>
            <i className={`iconfont ${this.thumbIsActive.call(this, this.props.articleItemData.id || this.props.articleItemData.objectId) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
            <span className="count">{this.isThumb.call(this, this.props.articleItemData.id || this.props.articleItemData.objectId, this.props.articleItemData.likeCount || this.props.articleItemData.collectionCount)}</span>
          </span>
          <span className="comment">
            <i className="iconfont icon-pinglun"></i>
            <span className="count">{this.props.articleItemData.commentsCount}</span>
          </span>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.articleThumb}), {...actionCreator.profile})(withRouter(ArticleItem));
