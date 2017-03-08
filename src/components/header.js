import React, { Component } from 'react';
import logo from './logo.svg';

/**
 * Component for the web app header
 */
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {textExample: 'showing handler functions binding', clicked:false};
    /**
     *  This binding is necessary to make `this` work in the callback
     * 
     *  There are another callback function declaration to avoid this code
     *  but still been experimental. Ex:
     *   
          logLogoClick = (e) => {
            console.log('this is:', this);
          }
     * 
     * 
     * The benefits of this solution is about performace, because the callback is created just one time
     */
    this.logLogoClick = this.logLogoClick.bind(this);
  }

 /** 
 * Handler onClick event callback implementation
 */
  logLogoClick(e){
    console.log('Clicked action catchured');

    e.preventDefault(); //to prevent default

    this.setState((prevState, e) =>{
      return {clicked:!prevState.clicked};
    });
  }

  /**
   * Connditionals render: Inline If with Logical && Operator 
   */
  render() {
    return (
          <div className="App-header">
            
            <button className="headerBtn" onClick={this.logLogoClick}>
              <img src={logo} className="App-logo" alt="logo" />
            </button>

            {this.state.clicked &&
              <h2>Rocks!!!</h2>
            }
            {!this.state.clicked &&
              <h2>First React Web App</h2>
            }

          </div>
    )
  }

}

export default Header;