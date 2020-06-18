import React from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./ColumnItem.styl";

import {ArticleCls} from "../../../assets/js/class.js";
import actionCreator from "../../../store/actionCreator";

import UserBox from "../../../components/content/UserBox/UserBox.js";

class ColumnItem extends React.Component {
  static defaultProps = {
    columnItemData: {}
  };

  static propTypes = {
    columnItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleColumnItemClick(columnItemData) {
    this.props.history.push(`/article/${columnItemData.objectId || columnItemData.id}`);
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
      if(!thumbCount) {
        return "点赞";
      }else {
        return thumbCount;
      }
    }
  }

  thumbIsActive(objectId) {
    const index = this.props.articleThumbList.findIndex(item => item.objectId === objectId);
    return index !== -1;
  }

  render() {
    return (
      <div className="columnItem-wrapper">
        <div className="columnItem-header">
          <div className="user-box">
            <UserBox userData={this.props.columnItemData.user}/>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>
        <div className="columnItem-content border-1px"  onClick={this.handleColumnItemClick.bind(this, this.props.columnItemData)}>
          <div className="title-box">
            <span className="tag">专栏</span>
            {this.props.columnItemData.title}
          </div>
          <div className="content">
            <div className="text">
              {this.props.columnItemData.content}
            </div>
            {this.props.columnItemData.screenshot ?
              <div className="img-box" style={{backgroundImage: `url(${this.props.columnItemData.screenshot})`}}></div>
              : undefined}
          </div>
        </div>
        <div className="columnItem-footer">
          <div className={`footer-item ${this.thumbIsActive.call(this, this.props.columnItemData.objectId || this.props.columnItemData.id) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.columnItemData)}>
            <i className={`iconfont ${this.thumbIsActive.call(this, this.props.columnItemData.objectId || this.props.columnItemData.id) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
            <span>{this.isThumb.call(this, this.props.columnItemData.objectId || this.props.columnItemData.id, this.props.columnItemData.collectionCount || this.props.columnItemData.likeCount)}</span>
          </div>
          <div className="footer-item">
            <i className="iconfont icon-pinglun"></i>
            <span>{this.props.columnItemData.commentsCount || "评论"}</span>
          </div>
          <div className="footer-item">
            <i className="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </div>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.articleThumb}), {...actionCreator.profile})(withRouter(ColumnItem));
