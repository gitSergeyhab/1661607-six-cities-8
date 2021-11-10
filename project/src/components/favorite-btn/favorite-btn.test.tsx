import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import FavoriteBtn from './favorite-btn';
import { renderComponent } from '../../utils/test-utils';
import { stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { BtnType } from '../../constants';
import { postFavoriteStatus } from '../../store/api-actions';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);


describe('FavoriteBtn Component', () => {
  it('should render correctly isFavorite={false}', () => {

    const favoriteBtn = <FavoriteBtn isFavorite={false} btnType={BtnType.FavoriteCard} hotelId={TEST_ID}/>;
    renderComponent(favoriteBtn, store, history);

    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('should dispatch postFavoriteStatus', () => {

    const favoriteBtn = <FavoriteBtn isFavorite={false} btnType={BtnType.FavoriteCard} hotelId={TEST_ID}/>;
    renderComponent(favoriteBtn, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('button'));

    setTimeout(() => expect(store.getActions()).toEqual([postFavoriteStatus(1, 0, undefined, BtnType.MainCard)]), 0);
  });
});
