import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Login from '../login/login';
import Main from '../main/main';
import MainEmpty from '../main-empty/main-empty';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';

import {AppRoute, AuthorizationStatus, CITIES} from '../../constants';

import {OFFERS, COMMENTS} from '../../mocks';

// import {checkStatus} from '../../temporary-util';
// import {Redirect} from 'react-router-dom';

const city = CITIES[3];

const mainRender = OFFERS.filter((offer) => offer.city.name === city).length ?
  <Main offers={OFFERS} authorizationStatus={AuthorizationStatus.NoAuth} selectedCity={city}/> :
  <MainEmpty authorizationStatus={AuthorizationStatus.NoAuth} selectedCity={city}/>;


const favoritesRender = OFFERS.filter((offer) => offer.isFavorite).length ?
  () => <Favorites offers={OFFERS.filter((offer) => offer.isFavorite)} /> :
  () => <FavoritesEmpty/>;

function App(): JSX.Element {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          {mainRender}
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <Route exact path={AppRoute.Favorites}>
          <PrivateRoute
            exact
            path={AppRoute.Favorites}
            render={favoritesRender}
            authorizationStatus={AuthorizationStatus.NoAuth}
          />
          {/* ??? почему вместо PrivateRoute не сделать так: ??? */}
          {/* {checkStatus(AuthorizationStatus.NoAuth) ? <Favorites offers={OFFERS.filter((offer) => offer.isFavorite)}/> : <Redirect to={AppRoute.Login}/>} */}
        </Route>
        <Route exact path={AppRoute.Room}>
          <Room
            offer={OFFERS[0]}
            comments={COMMENTS}
            neighbours={OFFERS.slice(1,4)}
            authorizationStatus={AuthorizationStatus.NoAuth}
          />
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
