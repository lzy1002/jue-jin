import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "./Home.styl";

import Follow from "./childrenViews/Follow/Follow.js";
import Recommend from "./childrenViews/Recommend/Recommend.js";
import Hot from "./childrenViews/Hot/Hot.js";

import SearchBar from "../../components/content/SearchBar/SearchBar.js";
import TabControl from "../../components/content/TabControl/TabControl.js";

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="home-wrapper">
        <SearchBar/>
        <TabControl titleList={[{path: "/home/follow", title: "关注"}, {path: "/home/recommend", title: "推荐"}, {path: "/home/hot", title: "热榜"}]}/>
        <TransitionGroup>
          <CSSTransition in={true} key={this.props.location.pathname} classNames="move" timeout={1000}>
            <Switch location={this.props.location}>
              <Route path="/home/follow" component={Follow}/>
              <Route path="/home/recommend" component={Recommend}/>
              <Route path="/home/hot" component={Hot}/>
              <Redirect from="/home" to="/home/recommend"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>

      </div>
    )
  }

}

export default Home;
