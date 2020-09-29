import React from "react";

import "./Recommend.styl";

import {getAuthorsData} from "../../../../api/authors.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import UserItem from "../../../../components/content/UserItem/UserItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Recommend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorsData: {}
    };

    this.categoryId = "";

    this.pullUpLoad = true;

  }

  componentDidMount() {
    const lastId = "0";
    this.getAuthorsData(this.categoryId, lastId);
  }

  getAuthorsData(categoryId, lastId) {
    getAuthorsData(categoryId, lastId).then(res => {
      this.setState({
        authorsData: res.data
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.authorsData.has_more) return;
    const lastId = this.state.authorsData.cursor;
    getAuthorsData(this.categoryId, lastId).then(res => {
      this.setState((prevState) => ({
        authorsData: {
          ...prevState.authorsData,
          data: [...prevState.authorsData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  render() {
    return(
      <div className="authorsRecommend-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.authorsData.data ? this.state.authorsData.data.map((item, index) => (
            <UserItem key={index} userItemData={item}/>
          )) : undefined}
          <div style={{display: this.state.authorsData.data && this.state.authorsData.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default Recommend;
