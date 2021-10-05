import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';

import {AppRoute, AuthorizationStatus} from '../../constants';

import {OFFERS, COMMENTS} from '../../mocks';

// import {checkStatus} from '../../temporary-util';
// import {Redirect} from 'react-router-dom';

function App(): JSX.Element {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main offers={OFFERS} status={AuthorizationStatus.Auth}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <Route exact path={AppRoute.Favorites}>
          <PrivateRoute
            exact
            path={AppRoute.Favorites}
            render={() => <Favorites offers={OFFERS.filter((offer) => offer.isFavorite)}/> }
            authorizationStatus={AuthorizationStatus.Auth}
          />
          {/* ??? почему вместо PrivateRoute не сделать так: ??? */}
          {/* {checkStatus(AuthorizationStatus.NoAuth) ? <Favorites offers={OFFERS.filter((offer) => offer.isFavorite)}/> : <Redirect to={AppRoute.Login}/>} */}
        </Route>
        <Route exact path={AppRoute.Room}>
          <Room offer={OFFERS[0]} comments={COMMENTS} neighbours={OFFERS.slice(1,4)}/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
