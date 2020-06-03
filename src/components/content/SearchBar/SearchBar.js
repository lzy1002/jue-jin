import React from "react";

import "./SearchBar.styl";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="searchBar-wrapper">
        <div className="search-box">
          <i className="iconfont icon-sousuo"></i>
          <span className="text">搜索文章、用户、标签</span>
        </div>
        <div className="tag-box">
          <i className="iconfont icon-shezhi"></i>
          <span className="text">标签</span>
        </div>
      </div>
    )
  }

}

export default SearchBar;
