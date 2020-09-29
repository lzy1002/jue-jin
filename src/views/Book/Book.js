import React from "react";

import "./Book.styl";

import {getBookInfo} from "../../api/book.js";

import {levelIcon} from "../../assets/js/utils.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import SectionItem from "../../components/content/SectionItem/SectionItem.js";

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoData: {}
    };

  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    this.getBookInfo(bookId);
  }

  getBookInfo(bookId) {
    getBookInfo(bookId).then(res => {
      this.setState({
        infoData: res.data
      })
    })
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  handleUserClick(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
      <div className="book-wrapper">
        <div className="book-header">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            {this.state.infoData.data && this.state.infoData.data.booklet.base_info.title}
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>

        <div className="book-content">
          <Scroll>
            {this.state.infoData.data ?
              <div className="info-box">
                <div className="book-info border-1px">
                  <div className="avatar" style={{backgroundImage: `url(${this.state.infoData.data.booklet.base_info.cover_img})`}}></div>
                  <div className="content">
                    <h3 className="title">{this.state.infoData.data.booklet.base_info.title}</h3>
                    <p className="desc">{this.state.infoData.data.booklet.base_info.summary}</p>
                    <div className="user-box">
                      <div className="user" onClick={this.handleUserClick.bind(this, this.state.infoData.data.booklet.user_info.user_id)}>
                        <div className="user-avatar" style={{backgroundImage: `url(${this.state.infoData.data.booklet.user_info.avatar_large})`}}></div>
                        <span className="username">
                          <span>{this.state.infoData.data.booklet.user_info.user_name}</span>
                          <img src={levelIcon(this.state.infoData.data.booklet.user_info.level)} alt=""/>
                        </span>
                      </div>
                      <i className="iconfont icon-tianjiaqunzu"></i>
                    </div>
                  </div>
                </div>
                <div className="buyer-info border-1px">
                  <div className="buy-count">
                    <img src="https://b-gold-cdn.xitu.io/v3/static/img/buy-icon.1323aad.svg" alt=""/>
                    <span>{this.state.infoData.data.booklet.base_info.buy_count}人已购买</span>
                  </div>
                </div>
              </div>
            : undefined}

            {this.state.infoData.data ?
              <div className="section-box">
                <div className="section-title">小册内容</div>
                <div className="section">
                  {this.state.infoData.data.sections.map((item, index) => (
                    <SectionItem key={index} sectionItemData={item} num={index}/>
                  ))}
                </div>
              </div>
            : undefined}

            {this.state.infoData.data ?
              <div className="desc-box">
                <div className="article-content" dangerouslySetInnerHTML={{__html: this.state.infoData.data.introduction.content}}></div>
              </div>
            : undefined}
          </Scroll>
        </div>
      </div>
    )
  }

}

export default Book;
