import React from "react";

import "./Pins.styl";

import {getUserPins} from "../../../../api/user.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";

class Pins extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.userId === nextProps.match.params.userId) return;
    const userId = this.props.match.params.userId;
    this.getUserPins(userId);
  }

  getUserPins(userId) {
    getUserPins(userId).then(res => {
      this.setState({
        pins: res.data
      })
    })
  }

  render() {
    return (
      <div className="userPins-wrapper">
        {this.state.pins.data ? this.state.pins.data.map((item, index) => (
          <PinItem key={index} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Pins;
