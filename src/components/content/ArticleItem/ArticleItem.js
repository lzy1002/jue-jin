import React from "react";
import propTypes from "prop-types";

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

  render() {
    return (
      <div className="articleItem-wrapper">
        <div className="articleItem-header">
          <div className="user-box">
            <div className="avatar">
              <img src={this.props.articleItemData.user.avatarLarge} alt=""/>
            </div>
            <span className="username">{this.props.articleItemData.user.username}</span>
          </div>
          <div className="language-box">
            {this.props.articleItemData.tags.map((item, index) => (
              <span key={item.id}>{item.title}{index !== this.props.articleItemData.tags.length - 1 ? "/" : undefined}</span>
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

export default ArticleItem;
