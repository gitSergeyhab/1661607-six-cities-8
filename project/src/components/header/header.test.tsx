import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import Header from './header';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { ScreenText, stateAuthAndFilled, stateNoAuthAndEmpty, TestPageText } from '../../utils/test-constants';


const TestId = {
  SignIn: 'sign-in',
  SignOut: 'sign-out',
  Favorites: 'favorites',
  Logo: 'logo',
};


const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);

const renderHeader = (authorizationStatus: AuthorizationStatus) => render(
  <Provider store={store}>
    <Router history={history}>
      <Header authorizationStatus={authorizationStatus}/>
    </Router>,
  </Provider>,
);


describe('Component Header', () => {
  describe('should render correctly', () => {
    it('AUTH: should render with altText and "Sign Out"', () => {

      renderHeader(AuthorizationStatus.Auth);

      expect(screen.getByText(ScreenText.Header.SignOut)).toBeInTheDocument();
      expect(screen.getByAltText(ScreenText.Header.Alt)).toBeInTheDocument();
      expect(screen.queryByText(ScreenText.Header.SignIn)).not.toBeInTheDocument();
    });

    it('NO_AUTH: should render with altText and "Sign In"', () => {

      renderHeader(AuthorizationStatus.NoAuth);

      expect(screen.getByText(ScreenText.Header.SignIn)).toBeInTheDocument();
      expect(screen.getByAltText(ScreenText.Header.Alt)).toBeInTheDocument();
      expect(screen.queryByText(ScreenText.Header.SignOut)).not.toBeInTheDocument();
    });
  });

  describe('should rout correctly', () => {
    it('AUTH: should redirect from Main to Favorite and from Favorite to Main when user clicked to link', () => {
      history.push(AppRoute.Main);
      const header = <Header authorizationStatus={AuthorizationStatus.Auth} />;
      render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path={AppRoute.Favorites} exact>
                {header}
                <h1>{TestPageText.Favorites}</h1>
              </Route>
              <Route path={AppRoute.Main} exact>
                {header}
                <h1>{TestPageText.Main}</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>,
      );
      expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(TestId.Favorites));

      expect(screen.queryByText(TestPageText.Favorites)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(TestId.Logo));

      expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();
    });

    it('NO_AUTH: should redirect from Main to Login when user clicked to link', () => {
      const storeNoAuth = mockStore(stateNoAuthAndEmpty);
      history.push(AppRoute.Main);
      const header = <Header authorizationStatus={AuthorizationStatus.NoAuth} />;
      render(
        <Provider store={storeNoAuth}>
          <Router history={history}>
            <Switch>
              <Route path={AppRoute.Login} exact>
                {header}
                <h1>{TestPageText.Login}</h1>
              </Route>
              <Route path={AppRoute.Main} exact>
                {header}
                <h1>{TestPageText.Main}</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>,
      );
      expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Login)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(TestId.SignIn));

      expect(screen.queryByText(TestPageText.Login)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(TestId.Logo));

      expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Login)).not.toBeInTheDocument();
    });
  });


});
