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

    this.position = "recommended";

    this.pullUpLoad = true;

  }

  componentDidMount() {
    const lastId = "";
    this.getAuthorsData(this.position, lastId);
  }

  getAuthorsData(position, lastId) {
    getAuthorsData(position, lastId).then(res => {
      console.log(res);
      this.setState({
        authorsData: res.data.data.articleAuthorRecommendationList.items
      })
    })
  }

  handlePullUpLoad() {
    const hasNextPage = this.state.authorsData.pageInfo.hasNextPage;
    if(!hasNextPage) return;

    const lastId = this.state.authorsData.pageInfo.endCursor;
    getAuthorsData(this.position, lastId).then(res => {
      console.log(res);
      this.setState({
        authorsData: {
          edges: [...this.state.authorsData.edges, ...res.data.data.articleAuthorRecommendationList.items.edges],
          pageInfo: res.data.data.articleAuthorRecommendationList.items.pageInfo
        }
      })
    })
  }

  render() {
    return(
      <div className="authorsRecommend-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.authorsData.edges ? this.state.authorsData.edges.map((item, index) => (
            <UserItem key={index} userItemData={{user: item.node.author, title: item.node.author.jobTitle, info: item.node.description}}/>
          )) : undefined}
          <div style={{display: this.state.authorsData.pageInfo && this.state.authorsData.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default Recommend;
