import React from "react";

import "./Post.styl";

import {getUserPosts} from "../../../../api/user.js";

import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";

class Post extends React.Component {
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

  getUserPosts(userId) {
    getUserPosts(userId).then(res => {
      console.log(res);
      this.setState({
        userPosts: res.data.d.entrylist
      })
    })
  }

  render() {
    return (
      <div className="post-wrapper">
        {this.state.userPosts.map((item, index) => (
          <ArticleItem key={item.objectId} articleItemData={item}/>
        ))}
      </div>
    )
  }

}

export default Post;
