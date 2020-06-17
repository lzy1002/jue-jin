import React from "react";

import "./Book.styl";

import {getBookInfo, getBookBuyer, getBookSection} from "../../api/book.js";

import {levelIcon} from "../../assets/js/utils.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import SectionItem from "../../components/content/SectionItem/SectionItem.js";

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoData: {},
      buyerData: [],
      sectionData: []
    };

  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    this.getBookInfo(bookId);
    this.getBookBuyer(bookId);
    this.getBookSection(bookId);

  }

  getBookInfo(bookId) {
    getBookInfo(bookId).then(res => {
      console.log(res);
      this.setState({
        infoData: res.data.d
      })
    })
  }

  getBookBuyer(bookId) {
    getBookBuyer(bookId).then(res => {
      console.log(res);
      this.setState({
        buyerData: res.data.d
      })

    })
  }

  getBookSection(bookId) {
    getBookSection(bookId).then(res => {
      console.log(res);
      this.setState({
        sectionData: res.data.d
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
            {this.state.infoData.title}
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>

        <div className="book-content">
          <Scroll>
            <div className="info-box">
              {this.state.infoData.userData ?
                <div className="book-info border-1px">
                  <div className="avatar" style={{backgroundImage: `url(${this.state.infoData.img})`}}></div>
                  <div className="content">
                    <h3 className="title">{this.state.infoData.title}</h3>
                    <p className="desc">{this.state.infoData.desc}</p>
                    <div className="user-box">
                      <div className="user" onClick={this.handleUserClick.bind(this, this.state.infoData.userData.objectId)}>
                        <div className="user-avatar" style={{backgroundImage: `url(${this.state.infoData.userData.avatarLarge})`}}></div>
                        <span className="username">
                          <span>{this.state.infoData.userData.username}</span>
                          <img src={levelIcon(this.state.infoData.userData.level)} alt=""/>
                        </span>
                      </div>
                      <i className="iconfont icon-tianjiaqunzu"></i>
                    </div>
                  </div>
                </div>
              : undefined}
              {this.state.buyerData.length ?
                <div className="buyer-info border-1px">
                  <div className="buy-count">
                    <img src="https://b-gold-cdn.xitu.io/v3/static/img/buy-icon.1323aad.svg" alt=""/>
                    <span>{this.state.infoData.buyCount}人已购买</span>
                  </div>
                  <div className="buyer">
                    {this.state.buyerData.length ? this.state.buyerData.slice(0, 6).map((item, index) => (
                      <div key={item.id} className="buyer-item" style={{backgroundImage: `url(${item.avatarLarge})`}} onClick={this.handleUserClick.bind(this, item.id)}></div>
                    )) : undefined}
                  </div>
                </div>
              : undefined}
            </div>

            <div className="section-box">
              <div className="section-title">小册内容</div>
              <div className="section">
                {this.state.sectionData.length ? this.state.sectionData.map((item, index) => (
                  <SectionItem key={index} sectionItemData={item} num={index}/>
                )) : undefined}
              </div>
            </div>

            <div className="desc-box">
              {this.state.infoData.summaryHtml ?
                <div className="article-content" dangerouslySetInnerHTML={{__html: this.state.infoData.summaryHtml}}></div>
              : undefined}
            </div>

          </Scroll>
        </div>

      </div>
    )
  }

}

export default Book;
