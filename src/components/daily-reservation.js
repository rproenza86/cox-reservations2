import React, { Component, PropTypes } from 'react';
import HourReservation from './hour-reservation';
import {store} from './../index';
import {today} from './../reducers/reducer';

/**
 * This component solution don't update the UI, to update it the component must to be rerendered or use Redux
 */
class DayReservation extends Component {
  static propTypes = {
    hours: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    let itemsArray = this._prepareHoursList(props.hours);
    this.state = {hourly:itemsArray, firstRender:true};
  }

  _prepareHoursList(hoursObj){
    let itemsArray = [];
    for (var prop in hoursObj) {
        if (hoursObj.hasOwnProperty(prop)) {

            itemsArray.push(
                <HourReservation hour={prop} reservation={hoursObj[prop]} key={prop}/>     
            )//the key is important, or react show a warning error
        } 
    }
    return itemsArray;
  }

  render() {
    return (
      <div className="dayReservation">
        <h2>Available and reserved hours:</h2>
        <h3> 
            <ul>
                {this._prepareHoursList(store.getState()[today])}
            </ul> 
        </h3>
      </div>
    );
  }

}

export default DayReservation;