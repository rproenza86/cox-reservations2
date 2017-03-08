import React, { Component } from 'react';
/**
 * This component solution don't update the UI, to update it the component must to be rerendered or use Redux
 */
class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.intro}</h2>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

}

export default Clock;