import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus } from '../../constants';


const history = createMemoryHistory();

const RouteText = {
  PrivateRoute: 'Private Route',
  PublicRoute: 'Public Route',
};

const RouteTextRegExp = {
  PrivateRoute: new RegExp(RouteText.PrivateRoute, 'i'),
  PublicRoute: new RegExp(RouteText.PublicRoute, 'i'),
};

describe('Component: PrivateRouter', () => {

  beforeEach(() => history.push('/private'));

  it('should render component for public route, when user not authorized', () => {

    render(
      <Router history={history}>
        <Route exact path={AppRoute.Login}><h1>{RouteText.PublicRoute}</h1></Route>
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.NoAuth}
          exact
          path="/private"
          render={() => (<h1>{RouteText.PrivateRoute}</h1>)}
        />
      </Router>,
    );

    expect(screen.getByText(RouteTextRegExp.PublicRoute)).toBeInTheDocument();
    expect(screen.queryByText(RouteTextRegExp.PrivateRoute)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {

    render(
      <Router history={history}>
        <Route exact path={AppRoute.Login}><h1>{RouteText.PublicRoute}</h1></Route>
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
          exact
          path="/private"
          render={() => (<h1>{RouteText.PrivateRoute}</h1>)}
        />
      </Router>,
    );

    expect(screen.getByText(RouteTextRegExp.PrivateRoute)).toBeInTheDocument();
    expect(screen.queryByText(RouteTextRegExp.PublicRoute)).not.toBeInTheDocument();
  });
});
