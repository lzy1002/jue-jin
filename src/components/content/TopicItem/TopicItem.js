import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./TopicItem.styl";

class TopicItem extends React.Component {
  static defaultProps = {
    topicItemData: {}
  };

  static propTypes = {
    topicItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleTopicItemClick(topicId) {
    this.props.history.push(`/topic/${topicId}`);
  }

  render() {
    return (
      <div className="topicItem-wrapper border-1px" onClick={this.handleTopicItemClick.bind(this, this.props.topicItemData.objectId)}>
        <div className="img-box" style={{backgroundImage: `url(${this.props.topicItemData.icon})`}}></div>
        <div className="content">
          <p className="title">{this.props.topicItemData.title}</p>
          <p className="info">
            <span>{this.props.topicItemData.followersCount}关注者</span>
            <span> · </span>
            <span>{this.props.topicItemData.msgsCount}沸点</span>
          </p>
        </div>
        <div className="follow-btn">关注</div>
      </div>
    )
  }

}

export default withRouter(TopicItem);
