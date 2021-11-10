import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Footer from './footer';
import { Provider} from 'react-redux';
import { AppRoute } from '../../constants';
import { ScreenText, stateAuthAndFilled, TestPageText } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);


describe('Component Footer', () => {

  it('should render with altText', () => {

    const { getByAltText, getByRole } = render(
      <Router history={history}>
        <Footer/>
      </Router>,
    );

    const altText = getByAltText(ScreenText.Header.Alt);
    expect(altText).toBeInTheDocument();

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should redirect from Favorites to Main with click on link', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Favorites}>
              <Footer/>
              {TestPageText.Favorites}
            </Route>
            <Route exact path={AppRoute.Main}>
              {TestPageText.Main}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const btn = screen.getByRole('link');

    expect(btn).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Favorites)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

    userEvent.click(btn);

    expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
