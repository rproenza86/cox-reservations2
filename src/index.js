import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

import { Provider } from 'react-redux';
import appointmentApp from './reducers/reducer';
import { createStore } from 'redux';

export let store = createStore(appointmentApp) 

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

render();
store.subscribe(render);