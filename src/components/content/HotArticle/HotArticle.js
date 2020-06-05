import React from "react";
import propTypes from "prop-types";

import "./HotArticle.styl";

class HotArticle extends React.Component {
  static defaultProps = {
    hotArticleList: []
  };

  static propTypes = {
    hotArticleList: propTypes.array
  };

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  getPublishData(createdAt) {
    const createDate = new Date(createdAt).getTime();
    const nowDate = new Date().getTime();
    const publishDate = nowDate - createDate;
    const hour = publishDate / 1000 / 60 / 60;
    if(hour >= 24) {
      return Math.floor(hour / 24) + "天前";
    }

    return Math.floor(hour) + "小时前";
  }

  render() {
    return (
      <div className="hotArticle-wrapper">
        <div className="title-box border-1px">
          <span className="title">
            <i className="iconfont icon-hot"></i>
            热门文章
          </span>
          <div className="delete-box">
            <i className="iconfont icon-chuyidong1-copy"></i>
          </div>
        </div>
        <div className="article-box">
          {this.props.hotArticleList.map((item, index) => (
            <div key={item.entry.id} className="article-item border-1px">
              <h3 className="article-title">{item.entry.title}</h3>
              <p className="article-info">
                <span>{item.entry.likeCount}赞 · {item.entry.user.username} · {this.getPublishData.call(this, item.entry.createdAt)}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

}

export default HotArticle;
