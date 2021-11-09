import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import FavoritesInCity from './favorites-in-city';
import { changeCity, changeMainOffers } from '../../store/action';
import { renderComponent } from '../../utils/test-utils';
import { initialCity, ScreenText, stateAuthAndFilled, TestPageText } from '../../utils/test-constants';
import { AppRoute } from '../../constants';


const DATA_TEST_ID = 'city-link';

const offers = stateAuthAndFilled.FavoriteData.favoriteOffers;
const filteredOffers = offers.filter((offer) => offer.city.name === initialCity);

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);


describe('FavoritesInCity Component', () => {
  const favoritesInCity = <FavoritesInCity offers={offers} city={initialCity}/>;

  it('should render correctly', () => {

    renderComponent(favoritesInCity, store, history);

    expect(screen.queryByText(initialCity)).toBeInTheDocument();
    expect(screen.queryAllByAltText(ScreenText.Card.ImgAlt).length).toBe(filteredOffers.length);
  });

  it('should dispatch changeCity and changeMainOffers', () => {

    renderComponent(favoritesInCity, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByTestId(DATA_TEST_ID));

    expect(store.getActions()).toEqual([changeCity(initialCity), changeMainOffers(initialCity)]);
  });

  it('should redirect to /', () => {

    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Favorites}>
              {favoritesInCity}
              {TestPageText.Favorites}
            </Route>
            <Route exact path={AppRoute.Main}>
              {TestPageText.Main}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(TestPageText.Favorites)).toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(DATA_TEST_ID));

    expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();
    expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
  });
});
