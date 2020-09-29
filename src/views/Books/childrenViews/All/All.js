import React from "react";
import {connect} from "react-redux";

import "./All.styl";

import actionCreator from "../../../../store/actionCreator/index.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import BookItem from "../../../../components/content/BookItem/BookItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class All extends React.Component {
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
    const cursor = "0";
    this.props.sagaInitBooksAll(cursor);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data) return;
    this.setState({
      refreshIsShow: false
    })
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    const cursor = "0";
    window.setTimeout(() => {
      this.props.sagaInitBooksAll(cursor);
    }, 1000);
  }

  handlePullUpLoad() {
    if(!this.props.has_more) return;
    this.props.sagaMoreBooksAll(this.props.cursor);
  }

  render() {
    return (
      <div className="booksAll-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)}>
          {this.props.data ? this.props.data.map((item, index) => (
            <BookItem key={index} bookItemData={item}/>
          )) : undefined}
          <div style={{display: this.props.data && this.props.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.books.all}), {...actionCreator.books})(All);
