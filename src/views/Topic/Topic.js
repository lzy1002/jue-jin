import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import "./Topic.styl";

import {getTopicInfo, getTopicAttenders} from "../../api/topic.js";

import {defaultAvatar} from "../../assets/js/utils.js";

import {TopicCls} from "../../assets/js/class.js";

import actionCreator from "../../store/actionCreator/index.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import TabControl from "../../components/content/TabControl/TabControl.js";
import FollowBtn from "../../components/content/FollowBtn/FollowBtn.js";

import Rank from "./childrenViews/Rank/Rank.js";
import Newest from "./childrenViews/Newest/Newest.js";

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicInfo: {},
      topicAttenders: {},
      titleIsShow: false
    };

    this.titleList = [
      {path: `/topic/${this.props.match.params.topicId}/rank`, title: "热门"},
      {path: `/topic/${this.props.match.params.topicId}/newest`, title: "最新"}
    ];
    this.tabBgColor = "#fff";
    this.arrowIsShow = false;
    this.activeColor = "#007fff";
    this.titleColor = "#333";
    this.lineBgColor = "#007fff";

    this.probeType = 3;

  }

  componentDidMount() {
    const topicId = this.props.match.params.topicId;
    this.getTopicInfo(topicId);
    this.getTopicAttenders(topicId);
  }

  getTopicInfo(topicId) {
    getTopicInfo(topicId).then(res => {
      this.setState({
        topicInfo: res.data
      })
    })
  }

  getTopicAttenders(topicId) {
    getTopicAttenders(topicId).then(res => {
      this.setState({
        topicAttenders: res.data
      })
    })
  }

  handleScrolling(position) {
    const {x, y} = position;
    if(-y >= 80 && this.state.titleIsShow === false) {
      this.setState({
        titleIsShow: true
      })
    }else if(-y < 80 && this.state.titleIsShow === true) {
      this.setState({
        titleIsShow: false
      })
    }

  }

  handleAvatarItemClick(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  handleFollowBtnClick(topicData) {
    const topic = new TopicCls(topicData);
    this.props.changeTopicFollowingState(topic);
  }

  topicIsActive(topicId) {
    const index = this.props.topicFollowingList.findIndex(item => item.topicId === topicId);
    return index !== -1;
  }

  render() {
    return (
      <div className="topic-wrapper">
        <div className="topic-header">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            {this.state.topicInfo.data ?
              <span className="title" style={{display: this.state.titleIsShow ? "block" : "none"}}>{this.state.topicInfo.data.topic.title}</span>
            : undefined}
          </div>
          <div className="share">
            <i className="iconfont icon-fenxiang"></i>
          </div>
        </div>

        <div className="topic-content">
          <Scroll probeType={this.probeType} handleScrolling={this.handleScrolling.bind(this)}>
            {this.state.topicInfo.data && this.state.topicAttenders.data ?
              <div className="topic-info">
                <div className="info-top">
                  <div className="img-box" style={{backgroundImage: `url(${this.state.topicInfo.data.topic.icon})`}}></div>
                  <div className="info-content">
                    <h3 className="title">{this.state.topicInfo.data.topic.title}</h3>
                    <div className="other">
                      <div className="other-item">
                        <p className="count">{this.state.topicInfo.data.topic.follower_count}</p>
                        <p className="text">关注者</p>
                      </div>
                      <div className="other-item">
                        <p className="count">{this.state.topicInfo.data.topic.msg_count}</p>
                        <p className="text">沸点</p>
                      </div>
                    </div>
                  </div>
                  <div className="follow-box">
                    <FollowBtn isFollow={this.topicIsActive.call(this, this.state.topicInfo.data.topic.topic_id)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.state.topicInfo.data)}/>
                  </div>
                </div>

                <div className="info-desc">
                  {this.state.topicInfo.data.topic.description}
                </div>
                <div className="info-attenders">
                  <div className="attenders-box">
                    {this.state.topicAttenders.data ? this.state.topicAttenders.data.slice(0, 6).map((item, index) => (
                      <div key={item.user_id} className="avatar-item" onClick={this.handleAvatarItemClick.bind(this, item.user_id)}>
                        <img src={defaultAvatar(item.avatar_large)} alt=""/>
                      </div>
                    )) : undefined}
                  </div>
                  <span className="total">已有{this.state.topicAttenders.count}人参加</span>
                </div>
              </div>
              : undefined}
            <div className="tabControl-box border-1px">
              <TabControl titleList={this.titleList} tabBgColor={this.tabBgColor} arrowIsShow={this.arrowIsShow} activeColor={this.activeColor} titleColor={this.titleColor} lineBgColor={this.lineBgColor}/>
            </div>

            <Switch>
              <Route path="/topic/:topicId/rank" component={Rank}/>
              <Route path="/topic/:topicId/newest" component={Newest}/>
              <Redirect from="/topic/:topicId" to="/topic/:topicId/rank"/>
            </Switch>

          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.topicFollowing}), {...actionCreator.profile})(Topic);
