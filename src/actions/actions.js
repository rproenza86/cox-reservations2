/**
 * Actions types
 */
export const ADD_RESERVATION = 'ADD_RESERVATION'
export const DEL_RESERVATION = 'DEL_RESERVATION'

/*
 * Action creators
 */
export function addReservation(reservationObj={}){
    return{
                type: 'ADD_RESERVATION',
                reservationObj
            };             
}

export function deleteReservation(index){
    return {
                type: 'DEL_RESERVATION',
                index
            };             
}

/*
 * Action dispatchers, move to other place
 */
//const boundAddReservation = (reservationObj) => dispatch(addReservation(reservationObj))
//const boundDeleteReservation = (index) => dispatch(deleteReservation(index))