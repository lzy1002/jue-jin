import React from "react";
import {connect} from "react-redux";

import actionCreator from "../../../../store/actionCreator/index.js";

import "./Hot.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import TabTags from "../../../../components/content/TabTags/TabTags.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Hot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshIsShow: false
    };

    this.sign = "THREE_DAYS_HOTTEST";
    this.tabTagsList = [
      {title: "三天内", sign: "THREE_DAYS_HOTTEST"},
      {title: "七天内", sign: "WEEKLY_HOTTEST"},
      {title: "30天内", sign: "MONTHLY_HOTTEST"},
      {title: "全部", sign: "HOTTEST"}
    ];

    this.pullDownRefresh = true;
    this.pullUpLoad = true;

    this.scroll = React.createRef();
  }

  componentDidMount() {
    if(this.props.articleFeed) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitHomeHot(this.sign);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.articleFeed) return;
    this.setState({
      refreshIsShow: false
    })
  }

  componentDidUpdate() {
    if(this.sign !== this.props.sign) {
      this.scroll.current.scrollTo(0, 0, 0);
    }
    this.sign = this.props.sign;
  }

  handleTagsItemClick(sign) {
    this.props.sagaInitHomeHot(sign);
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitHomeHot(this.sign);
    }, 1000);
  }

  handlePullUpLoad() {
    this.props.sagaMoreHomeHot(this.sign, this.props.articleFeed.items.pageInfo.endCursor);
  }

  render() {
    return (
      <div className="hot-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <TabTags actionSign={this.props.sign} tabTagsList={this.tabTagsList} handleTagsItemClick={this.handleTagsItemClick.bind(this)}/>
        <div className="hot-box">
          <Scroll ref={this.scroll} pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
            {this.props.articleFeed ? this.props.articleFeed.items.edges.map((item, index) => (
              <ArticleItem key={index} articleItemData={item.node}/>
            )) : undefined}
            <div style={{display: this.props.articleFeed ? "block" : "none"}}>
              <Loading/>
            </div>
          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.home.hot}), {...actionCreator.home})(Hot);
