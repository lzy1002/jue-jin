import React from "react";
import propTypes from "prop-types";
import {NavLink} from "react-router-dom";

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

  }

  render() {
    return (
      <div className="tabControl-wrapper">
        <div className="title-box">
          {this.props.titleList.map((item, index) => (
            <NavLink className="title-item" to={item.path} key={item.path}>{item.title}</NavLink>
          ))}
          <div className="bottom-line"></div>
        </div>
        <div className="arrow-box">
          <div className="arrow"></div>
        </div>
      </div>
    )
  }

}

export default TabControl;
