import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import Favorites from './favorites';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled, stateNoAuthAndEmpty } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const favorites = <Favorites/>;

describe('Favorites Component', () => {
  describe('Filled', () => {
    const store = mockStore(stateAuthAndFilled);
    it('should render correctly', () => {
      renderComponent(favorites, store, history);

      expect(screen.getAllByText(ScreenText.Favorite.Filled.Night).length).toBe(stateAuthAndFilled.FavoriteData.favoriteOffers.length);
      expect(screen.getByText(ScreenText.Favorite.Filled.Title)).toBeInTheDocument();
    });
  });

  describe('Empty', () => {
    const store = mockStore(stateNoAuthAndEmpty);
    it('should render correctly', () => {
      renderComponent(favorites, store, history);

      expect(screen.getByText(ScreenText.Favorite.Empty.Status)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Favorite.Empty.Description)).toBeInTheDocument();
    });
  });
});
