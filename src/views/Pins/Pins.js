import React from "react";
import {Route, Redirect} from "react-router-dom";

import "./Pins.styl";

import ReactSlideTransition from "../../components/common/ReactSlideTransition/ReactSlideTransition.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

import Recommend from "./childrenViews/Recommend/Recommend.js";
import Follow from "./childrenViews/Follow/Follow.js";
import Hot from "./childrenViews/Hot/Hot.js";

class Pins extends React.Component {
  constructor(props) {
    super(props);

    this.titleList = [
      {path: "/pins/follow", title: "关注"},
      {path: "/pins/recommend", title: "推荐"},
      {path: "/pins/hot", title: "热门"}
    ];

  }

  render() {
    return (
      <div className="pins-wrapper">
        <div className="tabControl-box">
          <TabControl titleList={this.titleList}/>
        </div>

        <ReactSlideTransition routerList={this.titleList}>
          <Route path="/pins/recommend" component={Recommend}/>
          <Route path="/pins/follow" component={Follow}/>
          <Route path="/pins/hot" component={Hot}/>
          <Redirect from="/pins" to="/pins/recommend"/>
        </ReactSlideTransition>

      </div>
    )
  }

}

export default Pins;
