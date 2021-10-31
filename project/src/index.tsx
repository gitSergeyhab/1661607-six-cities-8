import React from 'react';
import ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';
// import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus, RoomDataStatus } from './constants';
import { createAPI } from './services/api';
import { requireAuthorization, changeRoomDataStatus} from './store/action';
import { checkLoginAction, fetchHotelsAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/types';
import { configureStore } from '@reduxjs/toolkit';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => store.dispatch(changeRoomDataStatus(RoomDataStatus.NotFound)),
);


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});


(store.dispatch as ThunkAppDispatch)(checkLoginAction());

(store.dispatch as ThunkAppDispatch)(fetchHotelsAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

