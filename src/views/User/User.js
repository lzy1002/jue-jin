import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import "./User.styl";

import {getUserInfo} from "../../api/user.js";

import {levelIcon} from "../../assets/js/utils.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import Active from "./childrenViews/Active/Active.js";
import Post from "./childrenViews/Post/Post.js";
import Pin from "./childrenViews/Pin/Pin.js";
import Share from "./childrenViews/Share/Share.js";
import More from "./childrenViews/More/More.js";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserInfo(userId);

  }

  getUserInfo(userId) {
    getUserInfo(userId).then(res => {
      console.log(res);
      this.setState({
        userInfo: res.data.d[userId]
      })
    })
  }

  render() {
    return (
      <div className="user-wrapper">
        <div className="user-header">
          <div className="back">
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            <div className="username">
              <span>{this.state.userInfo.username}</span>
              <img src={levelIcon(this.state.userInfo.level)} alt=""/>
            </div>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>

        <div className="user-content">
          <Scroll>
            <div className="user-info">
              <div className="avatar-box">
                <img src={this.state.userInfo.avatarLarge} alt=""/>
              </div>
              <div className="content-box">
                <div className="info-top">
                  <div className="detail">
                    <h3 className="username">
                      <span>{this.state.userInfo.username}</span>
                      <img src={levelIcon(this.state.userInfo.level)} alt=""/>
                    </h3>
                    <p className="job">{this.state.userInfo.jobTitle}</p>
                    <p className="favorableAuthor">掘金优秀作者</p>
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
