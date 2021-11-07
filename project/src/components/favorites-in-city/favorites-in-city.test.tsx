import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import FavoritesInCity from './favorites-in-city';
import { renderComponent } from '../../utils/test-utils';
import { initialCity, stateAuthAndFilled } from '../../utils/test-constants';
import { makeFakeFavoritesList } from '../../utils/test-mocks';


const ALT_TEXT = 'Place';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateAuthAndFilled);

const offers = makeFakeFavoritesList();
const filteredOffers = offers.filter((offer) => offer.city.name === initialCity);

describe('FavoritesInCity Component', () => {
  it('should render correctly', () => {
    const favoritesInCity = <FavoritesInCity offers={offers} city={initialCity}/>;
    renderComponent(favoritesInCity, store, history);

    expect(screen.queryByText(initialCity)).toBeInTheDocument();
    expect(screen.queryAllByAltText(ALT_TEXT).length).toBe(filteredOffers.length);
  });
});
