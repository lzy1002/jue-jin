import React from "react";
import propTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Switch, withRouter} from "react-router-dom";

import {prefixStyle} from "../../../assets/js/dom.js";

const TRANSFORM = prefixStyle("transform");
const TRANSITION = prefixStyle("transition");

class ReactSlideTransition extends React.Component {
  static defaultProps = {
    routerList: []
  };

  static propTypes = {
    routerList: propTypes.array.isRequired
  };

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps() { // 该生命周期函数不会在页面第一次展示时触发 会在路由切换时触发 在该生命周期函数中拿到的路由地址是即将离开的路由地址
    this.oldPath = this.props.location.pathname;

  }

  onEnter(node) {  // node为即将要进入的路由页面的dom元素
    const oldIndex = this.props.routerList.findIndex(item => item.path === this.oldPath);
    const newIndex = this.props.routerList.findIndex(item => item.path === this.props.location.pathname);

    if(newIndex < oldIndex) {
      node.style.transform = "translateX(-100%)";
    }else if(newIndex > oldIndex) {
      node.style.transform = "translateX(100%)";
    }
  }

  onEntering(node) {
    node.style[TRANSITION] = "all 0.5s ease";
    node.style[TRANSFORM] = "translateX(0)";
  }

  onExit(node) {  // node为当前正在显示并且即将要离开的路由页面的dom元素
    node.style[TRANSFORM] = "translateX(0)";
  }

  onExiting(node) {
    const oldIndex = this.props.routerList.findIndex(item => item.path === this.oldPath);
    const newIndex = this.props.routerList.findIndex(item => item.path === this.props.location.pathname);
    if(newIndex < oldIndex) {
      node.style[TRANSITION] = "all 0.5s ease";
      node.style[TRANSFORM] = "translateX(100%)";
    }else if(newIndex > oldIndex) {
      node.style[TRANSITION] = "all 0.5s ease";
      node.style[TRANSFORM] = "translateX(-100%)";
    }
  }

  render() {
    return (
      <TransitionGroup>
        <CSSTransition key={this.props.location.pathname}
                       timeout={500}
                       onEnter={this.onEnter.bind(this)}
                       onEntering={this.onEntering.bind(this)}
                       onExit={this.onExit.bind(this)}
                       onExiting={this.onExiting.bind(this)}
        >
          <Switch location={this.props.location}>
            {this.props.children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }

}

export default withRouter(ReactSlideTransition);
