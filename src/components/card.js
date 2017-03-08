import React, { Component } from 'react';

class Card extends Component {

  render() {
    const classes = "card " + this.props.extraClasses;
    return (
        <div className={classes}>
            {this.props.children}
        </div>
    );
  }

}

export default Card;