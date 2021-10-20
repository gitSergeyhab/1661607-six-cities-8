import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
import {Offer, Comment} from '../../types/types';
import {AppRoute, AuthorizationStatus} from '../../constants';


type AppProps = {
  offers: Offer[],
  comments: Comment[],
  authorizationStatus: AuthorizationStatus,
  city: string,
}


function App({offers, comments, authorizationStatus, city}: AppProps): JSX.Element {
  return(
    <BrowserRouter>
      <Switch>

        <Route exact path={AppRoute.Main}>
          <Main authorizationStatus={authorizationStatus}/>
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
            offers={offers}
            comments={comments}
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

export default App;
