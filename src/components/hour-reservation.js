import React, { Component } from 'react';
import Card from './card';
import {store} from './../index';
import {addReservation} from './../actions/actions';
import {today} from './../reducers/reducer';

class HourReservation extends Component {

  constructor(props) {
    super(props);

    this.state = {  
                    hour:props.hour, 
                    status:props.reservation.status,
                    editing:props.reservation.editing || false,
                    clientName:props.reservation.clientName,
                    clientLastName:props.reservation.clientLastName,
                    clienEmail:props.reservation.clienEmail,
                    clientPhone:props.reservation.clientPhone
                };

    this.handleChange = this.handleChange.bind(this);
    this.reserve = this.reserve.bind(this);
    this.editReservation = this.editReservation.bind(this);

    this._setClientName = this._setClientName.bind(this);
    this._setclientLastName = this._setclientLastName.bind(this);
    this._setClientEmail = this._setClientEmail.bind(this);
    this._setClientPhone = this._setClientPhone.bind(this);
  }
 handleChange() {

 }
 editReservation(){
    this.setState({editing:true});
 }
 /** 
 * Handler onClick event callback implementation
 */
  reserve(event){
    event.preventDefault(); //to prevent default

    if(this.state.clientName) 
    {
        store.dispatch( addReservation({
            day:today,
            hour:this.state.hour,
            reservation:{status:'reserved',editing:false, clientName: this.state.clientName,clientLastName:this.state.clientLastName,clienEmail:this.state.clienEmail,clientPhone:this.state.clientPhone}
        }) )
    }else 
        this.setState({status:'free'}) ;    
    
    this.setState({editing:false});
  }

  _setClientName(e){
      this.setState({clientName:e.target.value});
  }

  _setclientLastName(e) {
      this.setState({clientLastName:e.target.value})
  }

  _setClientEmail(e) {
      this.setState({clienEmail:e.target.value})
  } 

  _setClientPhone(e) {
      this.setState({clientPhone:e.target.value})
  } 

  render() {
    let reservation = (store.getState()[today][this.state.hour].status === 'free') ? this.state : store.getState()[today][this.state.hour];

    const cssClasses = "hourElm " + reservation.status; 

    return (
        <Card key={reservation.hour} extraClasses={reservation.status}>
            <div id={reservation.hour} key={reservation.hour} className={cssClasses} onClick={this.editReservation}>
                <li key={reservation.hour}>{reservation.hour}</li>
                {this.state.editing &&
                    <form onSubmit={this.reserve}>
                        <fieldset>  
                            <label>
                                Name:
                                <input type="text" name="clientName" placeholder="First name" defaultValue={reservation.clientName} onChange={this._setClientName}/>
                                <input type="text" name="clientLastName" placeholder="Last name" defaultValue={reservation.clientLastName} onChange={this._setclientLastName}/>
                            </label><br/>
                            <label>
                                eMail:
                                <input type="email" name="name" placeholder="john.doe@gmail.com" defaultValue={reservation.clienEmail} onChange={this._setClientEmail}/>
                            </label><br/>
                            <label>
                                Phone number:
                                <input type="tel" name="name" placeholder="XXX-XXX-XXXX" defaultValue={reservation.clientPhone} onChange={this._setClientPhone}/>
                            </label><br/>
                            <input type="submit" value="Submit"/>
                        </fieldset>
                    </form>
                }
                {!this.state.editing && reservation.clientName &&
                    <fieldset>  
                        <p>{this.state.hour}</p>
                        <label>
                            Name:
                            <span> {reservation.clientName}</span>
                            <span> {reservation.clientLastName}</span>
                        </label><br/>
                        <label>
                            eMail:
                            <span> {reservation.clienEmail}</span>
                        </label><br/>
                        <label>
                            Phone number:
                            <span> {reservation.clientPhone}</span>
                        </label><br/>
                        <button onClick={this.editReservation}>
                            Edit
                        </button>
                    </fieldset>
                }
            </div>
        </Card>
    );
  }

}

export default HourReservation;