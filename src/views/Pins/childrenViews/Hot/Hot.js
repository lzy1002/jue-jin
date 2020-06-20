import React from "react";
import {connect} from "react-redux";

import "./Hot.styl";

import actionCreator from "../../../../store/actionCreator/index.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";

class Hot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshIsShow: false
    };

    this.pullUpLoad = true;
    this.pullDownRefresh = true;
  }

  componentDidMount() {
    if(this.props.edges) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitPinsHot();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.edges) return;
    this.setState({
      refreshIsShow: false
    })
  }

  handlePullUpLoad() {
    if(!this.props.pageInfo.hasNextPage) return;
    this.props.sagaMorePinsHot(this.props.pageInfo.endCursor);
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitPinsHot();
    }, 1000);
  }

  render() {
    return (
      <div className="pinsHot-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullUpLoad={this.pullUpLoad} pullDownRefresh={this.pullDownRefresh} handlePullUpLoad={this.handlePullUpLoad.bind(this)} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)}>
          {this.props.edges ? this.props.edges.map((item, index) => (
            <PinItem key={index} pinItemData={item.node}/>
          )) : undefined}
          <div style={{display: this.props.edges && this.props.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.pins.hot}), {...actionCreator.pins})(Hot);
