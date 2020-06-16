import React from "react";
import {Route, Redirect} from "react-router-dom";

import "./Books.styl";

import All from "./childrenViews/All/All.js";
import My from "./childrenViews/My/My.js";

import ReactSlideTransition from "../../components/common/ReactSlideTransition/ReactSlideTransition.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

class Books extends React.Component {
  constructor(props) {
    super(props);

    this.titleList = [
      {path: "/books/all", title: "全部"},
      {path: "/books/my", title: "已购"}
    ]

  }

  render() {
    return (
      <div className="books-wrapper">
        <div className="tabControl-box">
          <TabControl titleList={this.titleList} arrowIsShow={false} titleCenter={true}/>
        </div>

        <ReactSlideTransition routerList={this.titleList}>
          <Route path="/books/all" component={All}/>
          <Route path="/books/my" component={My}/>
          <Redirect from="/books" to="/books/all"/>
        </ReactSlideTransition>

      </div>
    )
  }

}

export default Books;
