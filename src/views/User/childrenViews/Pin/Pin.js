import React from "react";

import "./Pin.styl";

import {getUserPins} from "../../../../api/user.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";

class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: {}
    }

  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserPins(userId);
  }

  getUserPins(userId) {
    getUserPins(userId).then(res => {
      console.log(res);
      this.setState({
        pins: res.data.d
      })
    })
  }

  render() {
    return (
      <div className="pin-wrapper">
        {this.state.pins.list ? this.state.pins.list.map((item, index) => (
          <PinItem key={index} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Pin;
