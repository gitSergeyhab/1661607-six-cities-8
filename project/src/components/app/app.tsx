import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import Spinner from '../spinner/spinner';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus } from '../../constants';


type AppProps = {
  authorizationStatus: AuthorizationStatus,
  areHotelsLoaded: boolean,
}


const mapStateToProps = ({MainData: {areHotelsLoaded}, UserData: {authorizationStatus}} : State) => ({areHotelsLoaded, authorizationStatus});

function App({authorizationStatus, areHotelsLoaded}: AppProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('App');
  console.log(areHotelsLoaded);


  if (!areHotelsLoaded) {
    return <Spinner/>;
  }

  console.log('BrowserRouter');


  return(
    <BrowserRouter>
      <Switch>

        <Route exact path={AppRoute.Main}>
          <Main authorizationStatus={authorizationStatus} />
        </Route>

        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>

        <Route exact path={AppRoute.Favorites}>
          <PrivateRoute
            exact
            path={AppRoute.Favorites}
            render = {() => <Favorites/>}
            authorizationStatus={authorizationStatus}
          />
        </Route>

        <Route exact path={AppRoute.Room}>
          <Room authorizationStatus={authorizationStatus}/>
        </Route>

        <Route>
          <NotFoundPage authorizationStatus={authorizationStatus}/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps)(App);
