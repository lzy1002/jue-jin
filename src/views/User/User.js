import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import "./User.styl";

import {getUserInfo} from "../../api/user.js";

import {levelIcon} from "../../assets/js/utils.js";
import {prefixStyle} from "../../assets/js/dom.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

import Actives from "./childrenViews/Actives/Actives.js";
import Posts from "./childrenViews/Posts/Posts.js";
import Pins from "./childrenViews/Pins/Pins.js";
import Shares from "./childrenViews/Shares/Shares.js";
import More from "./childrenViews/More/More.js";

const TRANSFORM = prefixStyle("transform");

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      titleList: [],
      headerTrans: false
    };

    this.defaultAvatar = "https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg";
    this.headerHeight = -1;
    this.userContentTop = -1;

    this.activeColor = "#333";
    this.tabBgColor = "#fff";
    this.lineColor = "#0180ff";
    this.titleColor = "#666";
    this.arrowIsShow = false;

    this.probeType = 3;

    this.header = React.createRef();
    this.whiteBlock = React.createRef();
    this.userContent = React.createRef();

  }

  componentDidMount() {
    this.headerHeight = this.header.current.offsetHeight;
    this.userContentTop = this.userContent.current.offsetTop;
    this.whiteBlock.current.style[TRANSFORM] = `translate3d(0, ${this.userContentTop}px, 0)`;

    const userId = this.props.match.params.userId;
    this.getUserInfo(userId);

  }

  componentWillReceiveProps(nextProps) {  // 路由发生变化重新获取数据
    if(this.props.match.params.userId === nextProps.match.params.userId) return;
    const userId = nextProps.match.params.userId;
    this.getUserInfo(userId);
  }

  getUserInfo(userId) {
    getUserInfo(userId).then(res => {
      console.log(res);
      this.setState({
        userInfo: res.data.d[userId],
        titleList: [
          {path: `/user/${userId}/actives`, title: "动态"},
          {path: `/user/${userId}/posts`, title: `专栏 ${res.data.d[userId].postedPostsCount}`},
          {path: `/user/${userId}/pins`, title: `沸点 ${res.data.d[userId].pinCount}`},
          {path: `/user/${userId}/shares`, title: `分享 ${res.data.d[userId].postedEntriesCount}`},
          {path: `/user/${userId}/more`, title: "更多"}
        ]
      })
    })
  }

  handleScrolling(position) {
    const {x, y} = position;

    this.headerChange(x, y);
    this.whiteBlockMove(x, y);
  }

  headerChange(x, y) {
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

  whiteBlockMove(x, y) {
    if(-y >= this.userContentTop) {
      this.whiteBlock.current.style[TRANSFORM] = `translate3d(0, ${0}px, 0)`;
      return;
    }
    this.whiteBlock.current.style[TRANSFORM] = `translate3d(0, ${this.userContentTop + y}px, 0)`;
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="user-wrapper">
        <div className="white-block" ref={this.whiteBlock}></div>
        <div className="user-header" ref={this.header} style={{backgroundColor: this.state.headerTrans ? "#0180ff" : "transparent"}}>
          <div className="back" onClick={this.handleBack.bind(this)}>
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

        <div className="user-content" ref={this.userContent}>
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
              <Route path="/user/:userId/actives" component={Actives}/>
              <Route path="/user/:userId/posts" component={Posts}/>
              <Route path="/user/:userId/pins" component={Pins}/>
              <Route path="/user/:userId/shares" component={Shares}/>
              <Route path="/user/:userId/more" component={More}/>
              <Redirect from="/user/:userId" to="/user/:userId/actives"/>
            </Switch>

          </Scroll>
        </div>

      </div>
    )
  }

}

export default User;
