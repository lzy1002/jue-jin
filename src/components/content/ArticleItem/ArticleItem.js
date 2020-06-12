import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./ArticleItem.styl";

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
    this.props.history.push(`/user/${articleItemData.user.id || articleItemData.user.objectId}`);
    e.stopPropagation();  // 阻止合成事件间的事件冒泡
  }

  render() {
    return (
      <div className="articleItem-wrapper" onClick={this.handleArticleItemClick.bind(this, this.props.articleItemData)}>
        <div className="articleItem-header">
          <div className="user-box" onClick={e => this.handleUserBoxClick.call(this, e, this.props.articleItemData)}>
            <div className="avatar">
              <img src={this.props.articleItemData.user.avatarLarge} alt=""/>
            </div>
            <span className="username">{this.props.articleItemData.user.username}</span>
          </div>
          <div className="language-box">
            {this.props.articleItemData.tags.slice(0, 2).map((item, index) => (
              <span key={item.id}>{item.title}{index !== this.props.articleItemData.tags.slice(0, 2).length - 1 ? "/" : undefined}</span>
            ))}
          </div>
        </div>
        <div className="articleItem-content">
          <div className="content-left" style={{marginRight: this.props.articleItemData.screenshot ? "24px" : ""}}>
            <h3 className="title">{this.props.articleItemData.title}</h3>
            <div className="text">
              {this.props.articleItemData.content}
            </div>
          </div>
          {this.props.articleItemData.screenshot ? <div className="content-right" style={{backgroundImage: `url(${this.props.articleItemData.screenshot})`}}></div> : undefined}
        </div>
        <div className="articleItem-footer">
          <span className="like"><i className="iconfont icon-dianzan"></i><span className="count">{this.props.articleItemData.likeCount}</span></span>
          <span className="comment"><i className="iconfont icon-pinglun"></i><span className="count">{this.props.articleItemData.commentsCount}</span></span>
        </div>
      </div>
    )
  }

}

export default withRouter(ArticleItem);
