import React from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./RelatedItem.styl";

class RelatedItem extends React.Component {
  static defaultProps = {
    relatedItemData: {}
  };

  static propTypes = {
    relatedItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleArticleItemClick(articleItemData) {
    this.props.history.push(`/article/${articleItemData.article_id}`);
  }

  articleIsThumb(articleId, thumbCount) {
    const index = this.props.articleThumbList.findIndex(item => item.objectId === articleId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      return thumbCount;
    }
  }

  render() {
    return (
      <div className="related-wrapper border-1px" onClick={this.handleArticleItemClick.bind(this, this.props.relatedItemData)}>
        <h3 className="related-title">{this.props.relatedItemData.article_info.title}</h3>
        <p className="related-info">
          <span>{this.articleIsThumb(this.props.relatedItemData.article_id, this.props.relatedItemData.article_info.digg_count)}赞 · {this.props.relatedItemData.article_info.comment_count}评论 · {this.props.relatedItemData.author_user_info.user_name}</span>
        </p>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.articleThumb}))(withRouter(RelatedItem));
