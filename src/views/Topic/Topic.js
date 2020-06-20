import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import "./Topic.styl";

import {getTopicInfo, getTopicAttenders} from "../../api/topic.js";

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
        topicInfo: res.data.d
      })
    })
  }

  getTopicAttenders(topicId) {
    getTopicAttenders(topicId).then(res => {
      this.setState({
        topicAttenders: res.data.d
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

  topicIsActive(objectId) {
    const index = this.props.topicFollowingList.findIndex(item => item.objectId === objectId);
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
            <span className="title" style={{display: this.state.titleIsShow ? "block" : "none"}}>{this.state.topicInfo.title}</span>
          </div>
          <div className="share">
            <i className="iconfont icon-fenxiang"></i>
          </div>
        </div>
        <div className="topic-content">
          <Scroll probeType={this.probeType} handleScrolling={this.handleScrolling.bind(this)}>
            <div className="topic-info">
              <div className="info-top">
                <div className="img-box" style={{backgroundImage: `url(${this.state.topicInfo.icon})`}}></div>
                <div className="info-content">
                  <h3 className="title">{this.state.topicInfo.title}</h3>
                  <div className="other">
                    <div className="other-item">
                      <p className="count">{this.state.topicInfo.followersCount}</p>
                      <p className="text">关注者</p>
                    </div>
                    <div className="other-item">
                      <p className="count">{this.state.topicInfo.msgsCount}</p>
                      <p className="text">沸点</p>
                    </div>
                  </div>
                </div>
                {this.state.topicInfo.objectId ?
                  <div className="follow-box">
                    <FollowBtn isFollow={this.topicIsActive.call(this, this.state.topicInfo.objectId)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.state.topicInfo)}/>
                  </div>
                : undefined}
              </div>

              <div className="info-desc">
                {this.state.topicInfo.description}
              </div>
              <div className="info-attenders">
                <div className="attenders-box">
                  {this.state.topicAttenders.list ? this.state.topicAttenders.list.slice(0, 6).map((item, index) => (
                    <div key={item.objectId} className="avatar-item" onClick={this.handleAvatarItemClick.bind(this, item.objectId)}>
                      <img src={item.avatarLarge} alt=""/>
                    </div>
                  )) : undefined}
                </div>
                <span className="total">已有{this.state.topicAttenders.total}人参加</span>
              </div>
            </div>

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
