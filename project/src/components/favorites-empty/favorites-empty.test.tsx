import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import FavoritesEmpty from './favorites-empty';
import { ScreenText } from '../../utils/test-constants';
import { AuthorizationStatus } from '../../constants';
import { renderComponent } from '../../utils/test-utils';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({UserData: {authorizationStatus: AuthorizationStatus.Auth}});

describe('FavoritesEmpty Component', () => {
  it('should render text Status and Description', () => {

    const favorites = <FavoritesEmpty/>;
    renderComponent(favorites, store, history);

    expect(screen.getByText(ScreenText.Favorite.Empty.Status)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Favorite.Empty.Description)).toBeInTheDocument();
  });
});
