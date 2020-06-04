import React from "react";
import {NavLink, withRouter} from "react-router-dom";

import "./TabBar.styl";

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      home: "/home/recommend"
    }
  }

  componentDidUpdate() {
    if(this.props.location.pathname.startsWith("/home/") && this.state.home !== this.props.location.pathname) {
      this.setState({
        home: this.props.location.pathname
      })
    }
  }

  render() {
    return (
      <div className="tabBar-wrapper">
        <NavLink to={this.state.home} className={`tabBar-item ${this.props.location.pathname.includes("/home") ? "active" : ""}`}>
          <i className="iconfont icon-home"></i>
        </NavLink>
        <NavLink to="/pins" className="tabBar-item">
          <i className="iconfont icon-pin"></i>
        </NavLink>
        <NavLink to="/search" className="tabBar-item">
          <i className="iconfont icon-sousuo"></i>
        </NavLink>
        <NavLink to="/books" className="tabBar-item">
          <i className="iconfont icon-taizhangguanli-copy-copy"></i>
        </NavLink>
        <NavLink to="/profile" className="tabBar-item">
          <i className="iconfont icon-yonghu"></i>
        </NavLink>
      </div>
    )
  }

}

export default withRouter(TabBar);
