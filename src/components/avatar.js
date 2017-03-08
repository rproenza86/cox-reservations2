import React, { Component } from 'react';

/**
 * Component declaration accepting parameters
 */
class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {clicked:false};
    this.hideAvatar = this.hideAvatar.bind(this);
  }  

  hideAvatar(e){
    e.preventDefault(); //to prevent default

    this.setState((prevState, e) =>{
      return {clicked:!prevState.clicked};
    });
  }

  /**
   * Conditionals render: Inline If with Logical && Operator 
   * 
   * Mandatory insert it inside a div or other html tag
   */
  render() { 
    const clicked = this.state.clicked;
    return (
      <div>
        {clicked ? (
            <img 
              src={this.props.user.avatarUrl}
              role="presentation"
              onClick={this.hideAvatar}
            />
        ) : (
            <button className="avatarBtn" onClick={this.hideAvatar}>
              Show Avatar
            </button>
        )}
      </div>
    );
  }

}

export default Avatar;