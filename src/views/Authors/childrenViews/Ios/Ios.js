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

    this.categoryId = "6809635626661445640";

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

  render() {
    return(
      <div className="authorsIos-wrapper">
        <Scroll>
          {this.state.authorsData.data ? this.state.authorsData.data.map((item, index) => (
            <UserItem key={index} userItemData={item}/>
          )) : undefined}
        </Scroll>
      </div>
    )
  }

}

export default Ios;
