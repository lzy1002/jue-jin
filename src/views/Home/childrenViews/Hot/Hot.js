import React from "react";
import {connect} from "react-redux";

import actionCreator from "../../../../store/actionCreator/index.js";

import "./Hot.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import TabTags from "../../../../components/content/TabTags/TabTags.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";

class Hot extends React.Component {
  constructor(props) {
    super(props);

    this.sign = "THREE_DAYS_HOTTEST";
    this.tabTagsList = [
      {title: "三天内", sign: "THREE_DAYS_HOTTEST"},
      {title: "七天内", sign: "WEEKLY_HOTTEST"},
      {title: "30天内", sign: "MONTHLY_HOTTEST"},
      {title: "全部", sign: "HOTTEST"}
    ];

    this.pullDownRefresh = true;
    this.pullUpLoad = true;
  }

  componentDidMount() {
    if(this.props.articleFeed) return;
    console.log(123);
    this.props.sagaInitHomeHot(this.sign);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  handleTagsItemClick(sign) {
    this.sign = sign;
    this.props.sagaInitHomeHot(this.sign);

  }

  handlePullDownRefresh() {
    this.props.sagaInitHomeHot(this.sign);
  }

  handlePullUpLoad() {
    this.props.sagaMoreHomeHot(this.sign, this.props.articleFeed.items.pageInfo.endCursor);
  }

  render() {
    return (
      <div className="hot-wrapper">
        <TabTags actionSign={this.props.sign} tabTagsList={this.tabTagsList} handleTagsItemClick={this.handleTagsItemClick.bind(this)}/>
        <div className="hot-box">
          <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
            {this.props.articleFeed ? this.props.articleFeed.items.edges.map((item, index) => (
              <ArticleItem key={index} articleItemData={item.node}/>
            )) : undefined}
          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.home.hot}), {...actionCreator.home})(Hot);
