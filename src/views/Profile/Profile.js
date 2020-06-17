import React from "react";

import "./Profile.styl";

import Scroll from "../../components/common/Scroll/Scroll.js";

const userAvatar = require("../../assets/images/user.jpg");

class Profile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-header">我的</div>
        <div className="profile-content">
          <Scroll>
            <div className="user-info">
              <div className="avatar">
                <img src={userAvatar} alt=""/>
              </div>
              <div className="content">
                <p className="username">登录/注册</p>
                <p className="job-info">添加职位 @ 添加公司</p>
              </div>
              <div className="arrow">
                <i className="iconfont icon-go1"></i>
              </div>
            </div>

            <div className="option-box">
              <ul>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-lingdang"></i>
                  </div>
                  <span className="text">消息中心</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-good"></i>
                  </div>
                  <span className="text">我赞过的</span>
                  <span className="count">0篇</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-star"></i>
                  </div>
                  <span className="text">收藏集</span>
                  <span className="count">0个</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-gouwudai"></i>
                  </div>
                  <span className="text">已购小册</span>
                  <span className="count">0本</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-see"></i>
                  </div>
                  <span className="text">阅读过的文章</span>
                  <span className="count">0篇</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-xlcameraCenterLabel"></i>
                  </div>
                  <span className="text">标签管理</span>
                  <span className="count">0个</span>
                </li>
              </ul>
            </div>

            <div className="option-box">
              <ul>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-yijianfankui"></i>
                  </div>
                  <span className="text">意见反馈</span>
                </li>
                <li className="option-item border-1px">
                  <div className="icon">
                    <i className="iconfont icon-shezhi1"></i>
                  </div>
                  <span className="text">设置</span>
                </li>
              </ul>
            </div>
          </Scroll>
        </div>

      </div>
    )
  }

}

export default Profile;
