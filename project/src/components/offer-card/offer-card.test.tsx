import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import OfferCard from './offer-card';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderComponent, testCard } from '../../utils/test-utils';
import { offerCardProps } from '../favorite-card/favorite-card';
import { stateAuthAndFilled, TestPageText, TEST_ID } from '../../utils/test-constants';
import { AppRoute, BtnType, RoomDataStatus } from '../../constants';
import { changeRoomDataStatus } from '../../store/action';


const ROOM_ORIGINAL_PATH = '/offer/12';
const ROOM_ORIGINAL_TEXT = '/offer/12';

const offer = makeFakeOffer();
offer.id = TEST_ID;

const card =  <OfferCard offer={offer} btnType={BtnType.FavoriteCard} {...offerCardProps} />;

testCard(card, 'OfferCard');


describe('OfferCard Component', () => {

  const history = createMemoryHistory();
  const mockStore = configureMockStore([thunk]);
  const store = mockStore(stateAuthAndFilled);

  it('should dispatch changeRoomDataStatus', () => {

    renderComponent(card, store, history);

    const links = screen.getAllByRole('link');

    expect(store.getActions()).toEqual([]);

    userEvent.click(links[1]);

    expect(store.getActions()).toEqual([changeRoomDataStatus(RoomDataStatus.Loading)]);
  });

  describe('should redirect correctly', () => {

    const renderProviderWithCard = (cardWithRoute: JSX.Element) => render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {cardWithRoute}
            <Route path={AppRoute.Room}>
              {TestPageText.Room}
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    it('should redirect by FIRST link from MAIN to /offer/id', () => {

      history.push(AppRoute.Main);
      const cardInMain = <Route path={AppRoute.Main} exact>{card} {TestPageText.Main}</Route>;

      renderProviderWithCard(cardInMain);

      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);

      expect(screen.queryByText(TestPageText.Main)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Room)).not.toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();

      userEvent.click(links[0]);

      expect(screen.queryByText(TestPageText.Room)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();
    });

    it('should redirect by SECOND link from FAVORITES to /offer/id', () => {

      history.push(AppRoute.Favorites);
      const cardInFavorites = <Route path={AppRoute.Favorites} exact>{card} {TestPageText.Favorites}</Route>;

      renderProviderWithCard(cardInFavorites);

      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);

      expect(screen.queryByText(TestPageText.Favorites)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Room)).not.toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();

      userEvent.click(links[1]);

      expect(screen.queryByText(TestPageText.Room)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();
    });

    it('should redirect by SECOND link from /offer/12 to /offer/11', () => {

      history.push(ROOM_ORIGINAL_PATH);
      const cardInFavorites = <Route path={ROOM_ORIGINAL_PATH} exact>{card} {ROOM_ORIGINAL_TEXT}</Route>;
      renderProviderWithCard(cardInFavorites);

      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);

      expect(screen.queryByText(ROOM_ORIGINAL_TEXT)).toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Room)).not.toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Main)).not.toBeInTheDocument();
      expect(screen.queryByText(TestPageText.Favorites)).not.toBeInTheDocument();

      userEvent.click(links[1]);

      expect(screen.queryByText(TestPageText.Room)).toBeInTheDocument();
      expect(screen.queryByText(ROOM_ORIGINAL_TEXT)).not.toBeInTheDocument();
    });
  });
});
