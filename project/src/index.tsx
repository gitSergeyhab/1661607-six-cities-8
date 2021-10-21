import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './store/reducer';
import App from './components/app/app';
import { AuthorizationStatus } from './constants';

import {OFFERS} from './mocks/offers';
import {COMMENTS} from './mocks/comments';


const store = createStore(reducer, composeWithDevTools());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OFFERS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
