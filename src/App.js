import React from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";

import Home from "./views/Home/Home.js";
import Pins from "./views/Pins/Pins.js";
import Search from "./views/Search/Search.js";
import Books from "./views/Books/Books.js";
import Profile from "./views/Profile/Profile.js";
import Article from "./views/Article/Article.js";
import User from "./views/User/User.js";
import Pin from "./views/Pin/Pin.js";
import Topic from "./views/Topic/Topic.js";
import Authors from "./views/Authors/Authors.js";
import Topics from "./views/Topics/Topics.js";
import Result from "./views/Result/Result.js";

import TabBar from "./components/content/TabBar/TabBar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="app-wrapper" style={{width: "100%", height: "100%"}}>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/pins" component={Pins}/>
          <Route path="/search" component={Search}/>
          <Route path="/books" component={Books}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/article/:articleId" component={Article}/>
          <Route path="/user/:userId" component={User}/>
          <Route path="/pin/:pinId" component={Pin}/>
          <Route path="/topic/:topicId" component={Topic}/>
          <Route path="/authors" component={Authors}/>
          <Route path="/topics" component={Topics}/>
          <Route path="/result" component={Result}/>
          <Redirect from="/" to="/home/recommend"/>
        </Switch>
        <TabBar/>
      </div>
    )
  }

}

export default withRouter(App);
