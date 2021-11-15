import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus } from './constants';
import { createAPI } from './services/api';
import { requireAuthorization} from './store/action';
import { checkLoginAction, fetchHotelsAction } from './store/api-actions';
import { listenNetStatus } from './utils/net-util';

import 'react-toastify/dist/ReactToastify.css';


const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});


store.dispatch(checkLoginAction());
store.dispatch(fetchHotelsAction());
listenNetStatus(store);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer/>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

