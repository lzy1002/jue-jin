import React from "react";
import {connect} from "react-redux";

import "./All.styl";

import actionCreator from "../../../../store/actionCreator/index.js";

class All extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.pageNum = 1;

  }

  componentDidMount() {
    this.props.sagaInitBooksAll(this.pageNum);
    this.pageNum = this.pageNum + 1;
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="booksAll-wrapper">
        All
      </div>
    )
  }

}

export default connect(state => ({...state.books.all}), {...actionCreator.books})(All);
