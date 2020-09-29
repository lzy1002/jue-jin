import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./HotArticle.styl";

import RelatedItem from "../RelatedItem/RelatedItem.js";

class HotArticle extends React.Component {
  static defaultProps = {
    hotArticleList: []
  };

  static propTypes = {
    hotArticleList: propTypes.array
  };

  constructor(props) {
    super(props);

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
            <RelatedItem key={item.item_info.article_id} relatedItemData={item.item_info}/>
          ))}
        </div>
      </div>
    )
  }

}

export default withRouter(HotArticle);
