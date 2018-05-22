import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import { fromJS } from 'immutable';

import 'bootstrap/dist/css/bootstrap.min.css';

let initialState = fromJS({});

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
