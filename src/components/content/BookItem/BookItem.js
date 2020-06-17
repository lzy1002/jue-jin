import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./BookItem.styl";

import {levelIcon} from "../../../assets/js/utils.js";

class BookItem extends React.Component {
  static defaultProps = {
    bookItemData: {}
  };

  static propTypes = {
    bookItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleBookItemClick(bookId) {
    this.props.history.push(`/book/${bookId}`);
  }

  render() {
    return (
      <div className="bookItem-wrapper border-1px" onClick={this.handleBookItemClick.bind(this, this.props.bookItemData.id)}>
        <div className="book-avatar" style={{backgroundImage: `url(${this.props.bookItemData.img})`}}></div>

        <div className="content">
          <h3 className="title">{this.props.bookItemData.title}</h3>
          <p className="username">
            <span>{this.props.bookItemData.userData.username}</span>
            <img src={levelIcon(this.props.bookItemData.userData.level)} alt=""/>
          </p>
          <p className="info">
            <span>{this.props.bookItemData.lastSectionCount}小结</span>
            <span> · </span>
            <span>{this.props.bookItemData.buyCount}人已购买</span>
          </p>
        </div>

        <div className="price-btn">￥{this.props.bookItemData.price}</div>
      </div>
    )
  }

}

export default withRouter(BookItem);
