import React, { Component } from 'react'; 
import {store} from './../index';
import {today} from './../reducers/reducer';
/**
 * My components
 */
import Header from './header';
import Avatar from './avatar';
import Clock from './clock';
import DayReservation from './daily-reservation';
/**
 * Default css, with just one extra rule
 */
import './App.css';
/**
 * Object declaration used in this web app example
 */
const user = {
  firstName: 'Raul',
  lastName: 'Proenza',
  avatarUrl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p160x160/10690050_411445979008041_2358929565007267139_n.jpg?oh=da0672df47e54f0e536bc847d1a225f5&oe=594023A5'
};
/**
 * Element declaration to show the a lite composition
 */
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
/**
 * element declaration accepting parameters
 */
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
/**
 * Component declaration using ES6 and the extra features provides for
 * React in this aproach.
 * 
 * Integration with other childs component
 */
class App extends Component {

  render() {
  const reservations = store.getState();
    return (
        <div className="App">

          <Header />

          <div>
            {getGreeting(user)}
            <Clock intro="What time is it?" />
          </div>

          <Avatar user={user} />

          <DayReservation hours={reservations[today]}/>

        </div>
      )
  }

}

export default App;
