import React from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./TagItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import FollowBtn from "../../../components/content/FollowBtn/FollowBtn.js";

class TagItem extends React.Component {
  static defaultProps = {
    tagItemData: {}
  };

  static propTypes = {
    tagItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleFollowBtnClick(tagItemData) {
    console.log(tagItemData);
    this.props.changeTagFollowingState(tagItemData);
  }

  tagIsActive(tagItemData) {
    const index = this.props.tagFollowingList.findIndex(item => item.id === tagItemData.id);
    return index !== -1;
  }

  render() {
    return (
      <div className="tagItem-wrapper border-1px">
        <div className="img-box" style={{backgroundImage: `url(${this.props.tagItemData.icon})`}}></div>
        <div className="content">
          <p className="title">{this.props.tagItemData.title}</p>
          <p className="info">
            <span>{this.props.tagItemData.subscribersCount}人关注</span>
            <span> · </span>
            <span>{this.props.tagItemData.entryCount}篇文章</span>
          </p>
        </div>
        <FollowBtn isFollow={this.tagIsActive.call(this, this.props.tagItemData)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.tagItemData)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.tagFollowing}), {...actionCreator.profile})(TagItem);
