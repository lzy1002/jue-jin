import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import "./User.styl";

import {getUserInfo} from "../../api/user.js";

import {levelIcon} from "../../assets/js/utils.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

import Active from "./childrenViews/Active/Active.js";
import Post from "./childrenViews/Post/Post.js";
import Pin from "./childrenViews/Pin/Pin.js";
import Share from "./childrenViews/Share/Share.js";
import More from "./childrenViews/More/More.js";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      titleList: [],
      headerTrans: false
    };

    this.defaultAvatar = "https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg";
    this.headerHeight = 50;
    this.userContentTop = 140;

    this.activeColor = "#333";
    this.tabBgColor = "#fff";
    this.lineColor = "#0180ff";
    this.titleColor = "#666";
    this.arrowIsShow = false;

    this.probeType = 3;

  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserInfo(userId);

  }

  getUserInfo(userId) {
    getUserInfo(userId).then(res => {
      console.log(res);
      this.setState({
        userInfo: res.data.d[userId],
        titleList: [
          {path: `/user/${userId}/active`, title: "动态"},
          {path: `/user/${userId}/post`, title: `专栏 ${res.data.d[userId].postedPostsCount}`},
          {path: `/user/${userId}/pin`, title: `沸点 ${res.data.d[userId].pinCount}`},
          {path: `/user/${userId}/share`, title: `分享 ${res.data.d[userId].postedEntriesCount}`},
          {path: `/user/${userId}/more`, title: "更多"}
        ]
      })
    })
  }

  handleScrolling(position) {
    const {x, y} = position;
    if(-y >= this.userContentTop - this.headerHeight && this.state.headerTrans !== true) {
      this.setState({
        headerTrans: true
      })
    }else if(-y < this.userContentTop - this.headerHeight && this.state.headerTrans !== false) {
      this.setState({
        headerTrans: false
      })
    }
  }

  render() {
    return (
      <div className="user-wrapper">
        <div className="user-header" style={{backgroundColor: this.state.headerTrans ? "#0180ff" : "transparent"}}>
          <div className="back">
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            <div className="username" style={{transform: this.state.headerTrans ? `translateY(${0}px)` : `translateY(${50}px)`}}>
              <span>{this.state.userInfo.username}</span>
              <img src={levelIcon(this.state.userInfo.level)} alt=""/>
            </div>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>

        <div className="user-content">
          <Scroll probeType={this.probeType} handleScrolling={this.handleScrolling.bind(this)}>
            <div className="user-info">
              <div className="avatar-box" style={{backgroundImage: `url(${this.state.userInfo.avatarLarge || this.defaultAvatar})`}}></div>
              <div className="content-box">
                <div className="info-top">
                  <div className="detail">
                    <h3 className="username">
                      <span>{this.state.userInfo.username}</span>
                      <img src={levelIcon(this.state.userInfo.level)} alt=""/>
                    </h3>
                    <p className="job">{this.state.userInfo.jobTitle}</p>
                    {this.state.userInfo.roles && this.state.userInfo.roles.favorableAuthor.isGranted ?
                      <p className="favorableAuthor">掘金优秀作者</p>
                      : undefined}
                  </div>
                  <div className="button-box">
                    <div className="follow-btn">
                      <i className="iconfont icon-Add1"></i>
                      <span>关注</span>
                    </div>
                  </div>
                </div>
                <div className="desc">
                  {this.state.userInfo.selfDescription}
                </div>
                <div className="info-bottom">
                  <div className="info-bottom-item">
                    <p className="count">{this.state.userInfo.followeesCount}</p>
                    <p className="text">关注</p>
                  </div>
                  <div className="info-bottom-item">
                    <p className="count">{this.state.userInfo.followersCount}</p>
                    <p className="text">关注者</p>
                  </div>
                  <div className="info-bottom-item">
                    <p className="count">{this.state.userInfo.juejinPower}</p>
                    <p className="text">掘力值</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-box border-1px">
              {this.state.titleList.length ?
                <TabControl
                  titleList={this.state.titleList}
                  activeColor={this.activeColor}
                  arrowIsShow={this.arrowIsShow}
                  tabBgColor={this.tabBgColor}
                  lineBgColor={this.lineColor}
                  titleColor={this.titleColor}
                />
                : undefined}
            </div>

            <Switch>
              <Route path="/user/:userId/active" component={Active}/>
              <Route path="/user/:userId/post" component={Post}/>
              <Route path="/user/:userId/pin" component={Pin}/>
              <Route path="/user/:userId/share" component={Share}/>
              <Route path="/user/:userId/more" component={More}/>
              <Redirect from="/user/:userId" to="/user/:userId/active"/>
            </Switch>

          </Scroll>
        </div>

      </div>
    )
  }

}

export default User;
