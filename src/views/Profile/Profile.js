import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Link} from "react-router-dom";

import "./Profile.styl";

import Thumbed from "./childrenViews/Thumbed/Thumbed.js";
import Users from "./childrenViews/Users/Users.js";
import Watched from "./childrenViews/Watched/Watched.js";
import Tags from "./childrenViews/Tags/Tags.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

const userAvatar = require("../../assets/images/user.jpg");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-header">我的</div>
        <div className="profile-content">
          <Scroll>
            <div className="user-info">
              <div className="avatar">
                <img src={userAvatar} alt=""/>
              </div>
              <div className="content">
                <p className="username">登录/注册</p>
                <p className="job-info">添加职位 @ 添加公司</p>
              </div>
              <div className="arrow">
                <i className="iconfont icon-go1"></i>
              </div>
            </div>

            <div className="option-box">
              <div className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-lingdang"></i>
                </div>
                <span className="text">消息中心</span>
              </div>
              <Link to="/profile/thumbed" className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-good"></i>
                </div>
                <span className="text">我赞过的</span>
                <span className="count">{this.props.articleThumb.articleThumbList.length}篇</span>
              </Link>
              <Link to="/profile/users" className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-star"></i>
                </div>
                <span className="text">关注的用户</span>
                <span className="count">{this.props.userFollowing.userFollowingList.length}位</span>
              </Link>
              <div className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-gouwudai"></i>
                </div>
                <span className="text">已购小册</span>
                <span className="count">0本</span>
              </div>
              <Link to="/profile/watched" className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-see"></i>
                </div>
                <span className="text">阅读过的文章</span>
                <span className="count">{this.props.articleHistory.articleHistoryList.length}篇</span>
              </Link>
              <Link to="/profile/tags" className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-xlcameraCenterLabel"></i>
                </div>
                <span className="text">标签管理</span>
                <span className="count">{this.props.tagFollowing.tagFollowingList.length}个</span>
              </Link>
            </div>

            <div className="option-box">
              <div className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-yijianfankui"></i>
                </div>
                <span className="text">意见反馈</span>
              </div>
              <div className="option-item border-1px">
                <div className="icon">
                  <i className="iconfont icon-shezhi1"></i>
                </div>
                <span className="text">设置</span>
              </div>
            </div>
          </Scroll>
        </div>

        <Switch>
          <Route path="/profile/thumbed" component={Thumbed}/>
          <Route path="/profile/users" component={Users}/>
          <Route path="/profile/watched" component={Watched}/>
          <Route path="/profile/tags" component={Tags}/>
        </Switch>

      </div>
    )
  }

}

export default connect(state => ({...state.profile}))(Profile);
