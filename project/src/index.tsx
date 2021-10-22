import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './store/reducer';
import App from './components/app/app';
import { AuthorizationStatus } from './constants';

import { adaptHotelFromServer } from './services/adapters';

import {OFFERS} from './mocks/offers';
import {COMMENTS} from './mocks/comments';

// import { createAPI } from './services/api';

const store = createStore(reducer, composeWithDevTools());

/* eslint-disable no-console */

// const api = createAPI(() => console.log('NO_AUTH'));

// api.get('/hotels').then((res) => res.data).then((res) => console.log(res));

fetch('https://8.react.pages.academy/six-cities/hotels').then((r) => r.json()).then((r) => r.forEach((hot: any) => console.log(adaptHotelFromServer(hot))));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OFFERS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
