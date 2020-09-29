import React from "react";

import "./Posts.styl";

import {getUserPosts} from "../../../../api/user.js";

import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPosts: {}
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
        userPosts: res.data
      })
    })
  }

  render() {
    return (
      <div className="userPosts-wrapper">
        {this.state.userPosts.data ? this.state.userPosts.data.map((item, index) => (
          <ArticleItem key={item.article_id} articleItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Posts;
