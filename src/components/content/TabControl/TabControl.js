import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./TabControl.styl";

class TabControl extends React.Component {
  static defaultProps = {
    titleList: [],
    tabBgColor: "#0180ff",
    lineBgColor: "#fff",
    activeColor: "#fff",
    titleColor: "#cfcfd3",
    arrowIsShow: true,
    titleCenter: false
  };

  static propTypes = {
    titleList: propTypes.array,
    tabBgColor: propTypes.string,
    lineBgColor: propTypes.string,
    activeColor: propTypes.string,
    titleColor: propTypes.string,
    arrowIsShow: propTypes.bool,
    titleCenter: propTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      lineWidth: -1,
      lineLeft: -1,
      delay: 0
    };

    this.titleBox = React.createRef();
  }

  componentDidMount() {
    this.links = Array.prototype.slice.call(this.titleBox.current.children).slice(0, this.titleBox.current.children.length - 1);
    this.lineMove.call(this, 0);
  }

  componentDidUpdate() {
    this.links = Array.prototype.slice.call(this.titleBox.current.children).slice(0, this.titleBox.current.children.length - 1);
    this.lineMove.call(this, 500);
  }

  lineMove(delay) {
    const activeLink = this.links.find(item => item.getAttribute("path") === this.props.location.pathname);
    if(!activeLink) return;
    if(this.state.lineWidth === activeLink.offsetWidth && this.state.lineLeft === activeLink.offsetLeft) return;
    this.setState({
      lineWidth: activeLink.offsetWidth,
      lineLeft: activeLink.offsetLeft,
      delay
    })
  }

  changePath(path) {
    this.props.history.replace(path);
  }

  render() {
    return (
      <div className="tabControl-wrapper" style={{backgroundColor: this.props.tabBgColor}}>
        <div className="title-box" style={{textAlign: this.props.titleCenter ? "center" : "left"}} ref={this.titleBox}>
          {this.props.titleList.map((item, index) => (
            <div className="title-item" onClick={this.changePath.bind(this, item.path)} style={{color: this.props.location.pathname === item.path ? this.props.activeColor : this.props.titleColor}} path={item.path} key={item.path}>{item.title}</div>
          ))}
          <div className="bottom-line" style={{backgroundColor: this.props.lineBgColor, width: this.state.lineWidth + "px", left: this.state.lineLeft + "px", transition: `all ${this.state.delay}ms ease`}}></div>
        </div>
        {this.props.arrowIsShow ?
          <div className="arrow-box">
            <div className="arrow"></div>
          </div>
        : undefined}
      </div>
    )
  }

}

export default withRouter(TabControl);
