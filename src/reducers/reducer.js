import {ADD_RESERVATION,DEL_RESERVATION} from './../actions/actions'
import {getDateStr} from './../components/date-helper'
import {getData} from './../services/fetch'
import {store} from './../index';
import {addReservation} from './../actions/actions';

const serverData = getData('get');
serverData.then(function(data) {
    let arrayData = data.apiData;
    console.log(arrayData);
    if(arrayData.length){
        arrayData.map((obj)=>{
            store.dispatch( addReservation({
                    day:obj.day,
                    hour:obj.hour,
                    reservation:obj
                }) )
            return obj;
        })
    }
})

getData('create', 'PUT');

const hoursObj = {
                    '9:00AM':{status:'free',editing:false, clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "10:00AM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "11:00AM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "12:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "1:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "2:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "3:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "4:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null},
                    "5:00PM":{status:'free',clientName:null,clientLastName:null,clienEmail:null,clientPhone:null}
                };
export const today = getDateStr();

const initialState = {}; initialState[today] = hoursObj;

export default function appointmentApp(state = initialState, action = {type:null}) {
    switch (action.type) {
        case ADD_RESERVATION:
            let day = action.reservationObj.day || today,
                newDayAppoitment = Object.assign({}, state);
            newDayAppoitment[day] = Object.assign({}, newDayAppoitment[day]) || {}; 
            if (!newDayAppoitment[day].hasOwnProperty(action.reservationObj.hour)) {
            newDayAppoitment[day][action.reservationObj.hour] = {}
            }
            newDayAppoitment[day][action.reservationObj.hour] = {
                status:action.reservationObj.reservation.status,
                clientName:action.reservationObj.reservation.clientName,
                clientLastName:action.reservationObj.reservation.clientLastName,
                clienEmail:action.reservationObj.reservation.clienEmail,
                clientPhone:action.reservationObj.reservation.clientPhone
            }
            return newDayAppoitment
        case DEL_RESERVATION:
            const day_del = action.index.day,
                  hour = action.index.hour;
            if (state.hasOwnProperty(day_del)) {
                if (state[day_del].hasOwnProperty(hour)) {
                    let newState = Object.assign({}, state)
                    newState[day_del] = Object.assign({}, newState[day_del]) || {}; //this step is also necesarry otherwise the function is not pure
                    newState[day_del][hour] =  {status:'free',editing:false, clientName:null,clientLastName:null,clienEmail:null,clientPhone:null}
                    return newState
                }
            }
            return state
        default:
            return state
    }
}

