import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import "./Authors.styl";

import Recommend from "./childrenViews/Recommend/Recommend.js";
import Frontend from "./childrenViews/Frontend/Frontend.js";
import Android from "./childrenViews/Android/Android.js";
import Ios from "./childrenViews/Ios/Ios.js";
import Backend from "./childrenViews/Backend/Backend.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

class Authors extends React.Component {
  constructor(props) {
    super(props);

    this.arrowIsShow = false;
    this.titleList = [
      {path: "/authors/recommend", title: "推荐"},
      {path: "/authors/frontend", title: "前端"},
      {path: "/authors/android", title: "安卓"},
      {path: "/authors/ios", title: "ios"},
      {path: "/authors/backend", title: "后端"}
    ];
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="authors-wrapper">
        <div className="authors-header">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            作者榜
          </div>
        </div>
        <div className="tabControl-box">
          <TabControl arrowIsShow={this.arrowIsShow} titleList={this.titleList}/>
        </div>

        <Switch>
          <Route path="/authors/recommend" component={Recommend}/>
          <Route path="/authors/frontend" component={Frontend}/>
          <Route path="/authors/android" component={Android}/>
          <Route path="/authors/ios" component={Ios}/>
          <Route path="/authors/backend" component={Backend}/>
          <Redirect from="/authors" to="/authors/recommend"/>
        </Switch>
      </div>
    )
  }

}

export default Authors;
