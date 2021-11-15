import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Room from '../room/room';
// import Spinner from '../spinner/spinner';
// import { getHotelsLoadedStatus } from '../../store/main-data/main-data-selectors';
import { getAuthorizationStatus } from '../../store/user-data/user-data-selectors';
import { AppRoute } from '../../constants';
import NetStatus from '../net-status/net-status';


function App(): JSX.Element {

  // const areHotelsLoaded = useSelector(getHotelsLoadedStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  // if (!areHotelsLoaded) {
  //   return <Spinner/>;
  // }

  return(
    <>
      <NetStatus/>
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
    </>
  );
}

export default App;

