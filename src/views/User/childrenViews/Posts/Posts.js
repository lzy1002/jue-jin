import React from "react";

import "./Posts.styl";

import {getUserPosts} from "../../../../api/user.js";

import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPosts: []
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserPosts(userId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.userId === nextProps.match.params.userId) return;
    const userId = this.props.match.params.userId;
    this.getUserPosts(userId);
  }

  getUserPosts(userId) {
    getUserPosts(userId).then(res => {
      this.setState({
        userPosts: res.data.d.entrylist
      })
    })
  }

  render() {
    return (
      <div className="userPosts-wrapper">
        {this.state.userPosts.map((item, index) => (
          <ArticleItem key={item.objectId} articleItemData={item}/>
        ))}
      </div>
    )
  }

}

export default Posts;
