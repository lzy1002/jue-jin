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

    this.sign = 3;
    this.tabTagsList = [
      {title: "三天内", sign: 3},
      {title: "七天内", sign: 7},
      {title: "30天内", sign: 30},
      {title: "全部", sign: 0}
    ];

    this.pullDownRefresh = true;
    this.pullUpLoad = true;

    this.scroll = React.createRef();
  }

  componentDidMount() {
    if(this.props.hotData) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitHomeHot(this.sign);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.hotData) return;
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
    if(!this.props.hotData.has_more) return;
    this.props.sagaMoreHomeHot(this.sign, this.props.hotData.cursor);
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
            {this.props.hotData ? this.props.hotData.data.filter(item => item.item_type === 2).map((item, index) => (
              <ArticleItem key={index} articleItemData={item.item_info}/>
            )) : undefined}
            <div style={{display: this.props.hotData && this.props.hotData.has_more ? "block" : "none"}}>
              <Loading/>
            </div>
          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.home.hot}), {...actionCreator.home})(Hot);
