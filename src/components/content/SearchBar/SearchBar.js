import React from "react";
import propTypes from "prop-types";

import "./SearchBar.styl";

class SearchBar extends React.Component {
  static defaultProps = {
    tagBoxIsShow: true,
    handleSearchBarClick: () => {}
  };

  static propTypes = {
    tagBoxIsShow: propTypes.bool,
    handleSearchBarClick: propTypes.func
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="searchBar-wrapper">
        <div className="search-box" onClick={() => this.props.handleSearchBarClick()}>
          <i className="iconfont icon-sousuo"></i>
          <span className="text">搜索文章、用户、标签</span>
        </div>
        {this.props.tagBoxIsShow ?
          <div className="tag-box">
            <i className="iconfont icon-shezhi"></i>
            <span className="text">标签</span>
          </div>
        : undefined}
      </div>
    )
  }

}

export default SearchBar;
