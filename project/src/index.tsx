import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus, RoomDataStatus } from './constants';
import { createAPI } from './services/api';
import { requireAuthorization, changeRoomDataStatus} from './store/action';
import { checkLoginAction, fetchHotelsAction } from './store/api-actions';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => store.dispatch(changeRoomDataStatus(RoomDataStatus.NotFound)),
);


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});


store.dispatch(checkLoginAction());
store.dispatch(fetchHotelsAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

