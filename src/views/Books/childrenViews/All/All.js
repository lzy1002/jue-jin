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
    console.log(props);

    this.state = {
      refreshIsShow: false
    };

    this.pullDownRefresh = true;
    this.pullUpLoad = true;

  }

  componentDidMount() {
    if(this.props.books.length) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitBooksAll(1);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.books.length) return;
    this.setState({
      refreshIsShow: false
    })
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitBooksAll(1);
    }, 1000);
  }

  handlePullUpLoad() {
    if(!this.props.loadMore) return;
    this.props.sagaMoreBooksAll(this.props.pageNum);
  }

  render() {
    return (
      <div className="booksAll-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)}>
          {this.props.books.length ? this.props.books.map((item, index) => (
            <BookItem key={index} bookItemData={item}/>
          )) : undefined}
          <div style={{display: this.props.books.length && this.props.loadMore ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.books.all}), {...actionCreator.books})(All);
