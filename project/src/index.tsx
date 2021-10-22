import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './store/reducer';
import App from './components/app/app';
import { AuthorizationStatus } from './constants';

// import { adaptHotelFromServer } from './services/adapters';

// import {OFFERS} from './mocks/offers';
import {COMMENTS} from './mocks/comments';

import { createAPI } from './services/api';
import { loadOffers, requireLogout } from './store/action';
import { fetchHotelsAction, ThunkAppDispatch } from './store/api-actions';

const api = createAPI(() => store.dispatch(requireLogout()));

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch as ThunkAppDispatch)(fetchHotelsAction());
store.dispatch(loadOffers(store.getState().allOffers));

/* eslint-disable no-console */


// api.get('/hotels').then((res) => res.data).then((res) => console.log(res));

// fetch('https://8.react.pages.academy/six-cities/hotels').then((r) => r.json()).then((r) => r.forEach((hot: any) => console.log(adaptHotelFromServer(hot))));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));


// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App offers={OFFERS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth} />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root'));
