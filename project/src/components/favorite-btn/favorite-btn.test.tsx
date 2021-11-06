import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import FavoriteBtn from './favorite-btn';
import { renderComponent } from '../../utils/test-utils';
import { stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { BtnType } from '../../constants';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateAuthAndFilled);


describe('FavoriteBtn Component', () => {
  it('should render correctly', () => {
    const favoriteBtn = <FavoriteBtn isFavorite={false} btnType={BtnType.FavoriteCard} hotelId={TEST_ID}/>;
    renderComponent(favoriteBtn, store, history);

    expect(screen.queryByRole('button')).toBeInTheDocument();
  });
});
