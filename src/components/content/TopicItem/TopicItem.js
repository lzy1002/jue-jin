import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./TopicItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import {TopicCls} from "../../../assets/js/class.js";

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

  handleFollowClick(e, topicData) {
    const topic = new TopicCls(topicData);
    this.props.changeTopicFollowingState(topic);
    e.stopPropagation();
  }

  topicIsActive(topicId) {
    const index = this.props.topicFollowingList.findIndex(item => item.topicId === topicId);
    return index !== -1;
  }

  render() {
    return (
      <div className="topicItem-wrapper border-1px" onClick={this.handleTopicItemClick.bind(this, this.props.topicItemData.topic_id)}>
        <div className="img-box" style={{backgroundImage: `url(${this.props.topicItemData.topic.icon})`}}></div>
        <div className="content">
          <p className="title">{this.props.topicItemData.topic.title}</p>
          <p className="info">
            <span>{this.props.topicItemData.topic.follower_count}关注者</span>
            <span> · </span>
            <span>{this.props.topicItemData.topic.msg_count}沸点</span>
          </p>
        </div>
        <div className="follow-btn" onClick={e => this.handleFollowClick.call(this, e, this.props.topicItemData)}>{this.topicIsActive.call(this, this.props.topicItemData.topic_id) ? "已关注" : "关注"}</div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.topicFollowing}), {...actionCreator.profile})(withRouter(TopicItem));
