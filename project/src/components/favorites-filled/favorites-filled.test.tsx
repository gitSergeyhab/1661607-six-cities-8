import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import FavoritesFilled from './favorites-filled';
import { renderComponent } from '../../utils/test-utils';
import { makeFakeFavoritesList } from '../../utils/test-mocks';
import { ScreenText, stateAuthAndFilled } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('FavoritesFilled Component', () => {

  const store = mockStore(stateAuthAndFilled);
  it('should render correctly', () => {
    const favoritesFilled = <FavoritesFilled offers={makeFakeFavoritesList()}/>;
    renderComponent(favoritesFilled, store, history);

    expect(screen.getAllByText(ScreenText.Favorite.Filled.Night).length).toBe(stateAuthAndFilled.FavoriteData.favoriteOffers.length);
    expect(screen.getByText(ScreenText.Favorite.Filled.Title)).toBeInTheDocument();
  });
});
