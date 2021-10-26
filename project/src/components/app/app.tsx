import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import Spinner from '../spinner/spinner';
import { Offer, State } from '../../types/types';
import { AppRoute, AuthorizationStatus } from '../../constants';


type AppProps = {
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  areHotelsLoaded: boolean
}

const mapStateToProps = ({allOffers, areHotelsLoaded, authorizationStatus} : State) => ({offers: allOffers, areHotelsLoaded, authorizationStatus});

function App({offers, authorizationStatus, areHotelsLoaded}: AppProps): JSX.Element {

  if (!areHotelsLoaded) {
    return <Spinner/>;
  }

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
            render = {() => <Favorites offers={offers}/>}
            authorizationStatus={authorizationStatus}
          />
        </Route>

        <Route exact path={AppRoute.Room}>
          <Room
            authorizationStatus={authorizationStatus}
          />
        </Route>

        <Route>
          <NotFoundPage authorizationStatus={authorizationStatus}/>

        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps)(App);
