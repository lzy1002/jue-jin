import React, {Fragment} from "react";

import "./Actives.styl";

import {getUserActive} from "../../../../api/user.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
import FollowedItem from "../../../../components/content/FollowedItem/FollowedItem.js";

class Actives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userActive: {}
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserActive(userId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.userId === nextProps.match.params.userId) return;
    const userId = nextProps.match.params.userId;
    this.getUserActive(userId);
  }

  getUserActive(userId) {
    getUserActive(userId).then(res => {
      this.setState({
        userActive: res.data.data
      })
    })
  }

  render() {
    return (
      <div className="userActives-wrapper">
        {this.state.userActive.list ? this.state.userActive.list.map((item, index) => (
          <Fragment key={index}>
            {item.target_type === "short_msg" ?
              <Fragment>
                {item.action === 2 ?
                  <PinItem pinItemData={item.target_data}/>
                : undefined}

                {item.action === 3 ?
                  <div className="like-box">
                    <div className="like-header border-1px">
                      <span className="username">{item.user.user_name}</span>
                      <span>赞了这篇沸点</span>
                    </div>
                    <PinItem pinItemData={item.target_data}/>
                  </div>
                : undefined}

              </Fragment>
            : undefined}
            {item.target_type === "article" ?
              <Fragment>
                {item.action === 0 ?
                  <ArticleItem articleItemData={item.target_data}/>
                : undefined}

                {item.action === 1 ?
                  <div className="like-box">
                    <div className="like-header border-1px">
                      <span className="username">{item.user.user_name}</span>
                      <span>赞了这篇文章</span>
                    </div>
                    <ArticleItem articleItemData={item.target_data}/>
                  </div>
                  : undefined}

              </Fragment>
            : undefined}
            {item.target_type === "user" ?
              <FollowedItem followedItemData={item}/>
            : undefined}
          </Fragment>
        )) : undefined}
      </div>
    )
  }

}

export default Actives;
