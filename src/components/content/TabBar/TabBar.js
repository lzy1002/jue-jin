import React from "react";
import {NavLink, withRouter} from "react-router-dom";

import "./TabBar.styl";

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home: "/home/recommend",
      pins: "/pins/recommend",
      books: "/books/all"
    }
  }

  componentDidUpdate() {
    if(this.props.location.pathname.startsWith("/home/") && this.state.home !== this.props.location.pathname) {
      this.setState({
        home: this.props.location.pathname
      })
    }

    if(this.props.location.pathname.startsWith("/pins/") && this.state.pins !== this.props.location.pathname) {
      this.setState({
        pins: this.props.location.pathname
      })
    }

    if(this.props.location.pathname.startsWith("/books/") && this.state.books !== this.props.location.pathname) {
      this.setState({
        books: this.props.location.pathname
      })
    }
  }

  render() {
    return (
      <div className="tabBar-wrapper">
        <NavLink to={this.state.home} className={`tabBar-item ${this.props.location.pathname.includes("/home") ? "active" : ""}`}>
          <i className="iconfont icon-home"></i>
        </NavLink>
        <NavLink to={this.state.pins} className={`tabBar-item ${this.props.location.pathname.includes("/pins") ? "active" : ""}`}>
          <i className="iconfont icon-pin"></i>
        </NavLink>
        <NavLink to="/search" className="tabBar-item">
          <i className="iconfont icon-sousuo"></i>
        </NavLink>
        <NavLink to={this.state.books} className={`tabBar-item ${this.props.location.pathname.includes("/books") ? "active" : ""}`}>
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
