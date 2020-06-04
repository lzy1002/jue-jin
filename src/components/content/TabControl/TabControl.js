import React from "react";
import propTypes from "prop-types";
import {NavLink, withRouter} from "react-router-dom";

import "./TabControl.styl";

class TabControl extends React.Component {
  static defaultProps = {
    titleList: []
  };

  static propTypes = {
    titleList: propTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      lineWidth: 0,
      lineLeft: 0,
      delay: 0
    };

    this.titleBox = React.createRef();
  }

  componentDidMount() {
    this.links = Array.prototype.slice.call(this.titleBox.current.children).slice(0, this.titleBox.current.children.length - 1);
    this.lineMove.call(this, 0);
  }

  componentDidUpdate() {
    this.lineMove.call(this, 500);
  }

  lineMove(delay) {
    const activeLink = this.links.find(item => item.getAttribute("path") === this.props.location.pathname);
    if(this.state.lineWidth === activeLink.offsetWidth && this.state.lineLeft === activeLink.offsetLeft) return;
    this.setState({
      lineWidth: activeLink.offsetWidth,
      lineLeft: activeLink.offsetLeft,
      delay
    })
  }

  render() {
    return (
      <div className="tabControl-wrapper">
        <div className="title-box" ref={this.titleBox}>
          {this.props.titleList.map((item, index) => (
            <NavLink className="title-item" to={item.path} path={item.path} key={item.path}>{item.title}</NavLink>
          ))}
          <div className="bottom-line" style={{width: this.state.lineWidth + "px", left: this.state.lineLeft + "px", transition: `all ${this.state.delay}ms ease`}}></div>
        </div>
        <div className="arrow-box">
          <div className="arrow"></div>
        </div>
      </div>
    )
  }

}

export default withRouter(TabControl);
