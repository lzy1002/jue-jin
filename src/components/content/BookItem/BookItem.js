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
      <div className="bookItem-wrapper border-1px" onClick={this.handleBookItemClick.bind(this, this.props.bookItemData.booklet_id)}>
        <div className="book-avatar" style={{backgroundImage: `url(${this.props.bookItemData.base_info.cover_img})`}}></div>

        <div className="content">
          <h3 className="title">{this.props.bookItemData.base_info.title}</h3>
          <p className="username">
            <span>{this.props.bookItemData.user_info.user_name}</span>
            <img src={levelIcon(this.props.bookItemData.user_info.level)} alt=""/>
          </p>
          <p className="info">
            <span>{this.props.bookItemData.base_info.section_count}小结</span>
            <span> · </span>
            <span>{this.props.bookItemData.base_info.buy_count}人已购买</span>
          </p>
        </div>

        <div className="price-btn">{this.props.bookItemData.base_info.price !== 0 ? <span>￥{(this.props.bookItemData.base_info.price / 100).toFixed(1)}</span> : <span>免费</span>}</div>
      </div>
    )
  }

}

export default withRouter(BookItem);
