import React from "react";

import "./Ios.styl";

import {getAuthorsData} from "../../../../api/authors.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import UserItem from "../../../../components/content/UserItem/UserItem.js";

class Ios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorsData: {}
    };

    this.position = "ios";

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

  render() {
    return(
      <div className="authorsIos-wrapper">
        <Scroll>
          {this.state.authorsData.edges ? this.state.authorsData.edges.map((item, index) => (
            <UserItem key={index} userItemData={{user: item.node.author, title: item.node.author.jobTitle, info: item.node.description}}/>
          )) : undefined}
        </Scroll>
      </div>
    )
  }

}

export default Ios;
