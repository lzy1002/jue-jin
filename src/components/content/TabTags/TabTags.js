import React from "react";
import propTypes from "prop-types";

import "./TabTags.styl";

class TabTags extends React.Component {
  static defaultProps = {
    actionSign: "",
    tabTagsList: [],
    handleTagsItemClick: () => {}
  };

  static propTypes = {
    actionSign: propTypes.string,
    tabTagsList: propTypes.array,
    handleTagsItemClick: propTypes.func
  };

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="tabTags-wrapper border-1px">
        <ul className="tabTags-box">
          {this.props.tabTagsList.map((item, index) => (
            <li key={item.sign} className={`tags-item ${item.sign === this.props.actionSign ? "active" : ""}`} onClick={() => this.props.handleTagsItemClick(item.sign)}>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default TabTags;
