import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import {OFFERS} from './mocks/offers';
import {COMMENTS} from './mocks/comments';

import {AuthorizationStatus, CITIES} from './constants';

ReactDOM.render(
  <React.StrictMode>
    <App offers={OFFERS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth} city={CITIES[3]} />
  </React.StrictMode>,
  document.getElementById('root'));
