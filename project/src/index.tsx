import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
import { reducer } from './store/reducer';
import { AuthorizationStatus } from './constants';
import { createAPI } from './services/api';
import { requireAuthorization} from './store/action';
import { checkLoginAction, fetchHotelsAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/types';

import {COMMENTS} from './mocks/comments'; // удалю


const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch as ThunkAppDispatch)(fetchHotelsAction());

(store.dispatch as ThunkAppDispatch)(checkLoginAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={COMMENTS} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

