import React, {Fragment} from "react";
import {connect} from "react-redux";

import actionCreator from "../../../../store/actionCreator/index.js";

import "./Follow.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import LoginTip from "../../../../components/content/LoginTip/LoginTip.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Follow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshIsShow: false
    };

    this.pullDownRefresh = true;
    this.pullUpLoad = true;
  }

  componentDidMount() {
    if(this.props.data) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitHomeFollow();

  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data) return;
    this.setState({
      refreshIsShow: false
    });
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitHomeFollow();
    }, 1000);
  }

  handlePullUpLoad() {
    if(!this.props.has_more) return;
    this.props.sagaMoreHomeFollow(this.props.cursor);
  }

  render() {
    return (
      <div className="follow-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          <LoginTip/>
          {this.props.data ? this.props.data.map((item, index) => (
            <Fragment key={index}>
              {item.item_type === 2 ? <ArticleItem articleItemData={item.item_info}/> : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.props.data && this.props.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.home.follow}), {...actionCreator.home})(Follow);
