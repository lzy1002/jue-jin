import React from "react";
import {Route, Redirect} from "react-router-dom";

import "./Home.styl";

import Follow from "./childrenViews/Follow/Follow.js";
import Recommend from "./childrenViews/Recommend/Recommend.js";
import Hot from "./childrenViews/Hot/Hot.js";

import ReactSlideTransition from "../../components/common/ReactSlideTransition/ReactSlideTransition.js";

import SearchBar from "../../components/content/SearchBar/SearchBar.js";
import TabControl from "../../components/content/TabControl/TabControl.js";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.titleList = [
      {path: "/home/follow", title: "关注"},
      {path: "/home/recommend", title: "推荐"},
      {path: "/home/hot", title: "热榜"}
    ];
  }

  handleSearchBarClick() {
    this.props.history.push("/result");
  }

  render() {
    return (
      <div className="home-wrapper">
        <SearchBar handleSearchBarClick={this.handleSearchBarClick.bind(this)}/>
        <TabControl titleList={this.titleList}/>
        <ReactSlideTransition routerList={this.titleList}>  {/*使用该组件内部所有的路由页面都需要手动设置position: absolute 否则会出现切换时页面不在同一水平线上的问题*/}
          <Route path="/home/follow" component={Follow}/>
          <Route path="/home/recommend" component={Recommend}/>
          <Route path="/home/hot" component={Hot}/>
          <Redirect from="/home" to="/home/recommend"/>
        </ReactSlideTransition>
      </div>
    )
  }

}

export default Home;
