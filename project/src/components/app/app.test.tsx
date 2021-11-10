import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';

import App from './app';
import { renderComponent } from '../../utils/test-utils';
import { stateAuthAndFilled, stateNoAuthAndEmpty, ScreenText, TEST_ID } from '../../utils/test-constants';
import { AppRoute, AuthorizationStatus } from '../../constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const app = <App/>;
const renderFakeApp = (store: MockStore) => renderComponent(app, store, history);

describe('App Component', () => {
  describe('AUTH and FILLED', () => {
    const store = mockStore(stateAuthAndFilled);
    it('test rout /', () => {

      history.push(AppRoute.Main);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Main.Filled.Places)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();
    });

    it('test rout /login -> redirect to /', () => {

      history.push(AppRoute.Login);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Main.Filled.Places)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(ScreenText.Login.Email)).not.toBeInTheDocument();
    });

    it('test rout /favorites', () => {

      history.push(AppRoute.Favorites);
      renderFakeApp(store);

      expect(screen.getAllByText(ScreenText.Favorite.Filled.Night).length)
        .toBe(stateAuthAndFilled.FavoriteData.favoriteOffers.length);
      expect(screen.getByText(ScreenText.Favorite.Filled.Title))
        .toBeInTheDocument();
    });

    it('test rout /offer/id', () => {

      history.push(`offer/${TEST_ID}`);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.Auth.YourReview)).toBeInTheDocument();
    });

    it('test rout /fake -> redirect to notFoundPage', () => {

      history.push('/fake');
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Page404.Message)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Page404.Link)).toBeInTheDocument();
    });
  });


  describe('NO_AUTH and EMPTY', () => {
    const store = mockStore(stateNoAuthAndEmpty);

    it('test rout /', () => {

      history.push(AppRoute.Main);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Main.Empty.Description)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Empty.Status)).toBeInTheDocument();
    });

    it('test rout /login', () => {

      history.push(AppRoute.Login);
      renderFakeApp(store);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
    });

    it('test rout /favorites -> redirect /login', () => {

      history.push(AppRoute.Favorites);
      renderFakeApp(store);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();

      expect(screen.queryByText(ScreenText.Favorite.Filled.Title)).not.toBeInTheDocument();
      expect(screen.queryByText(ScreenText.Favorite.Empty.Status)).not.toBeInTheDocument();
    });
  });


  describe('AUTH and EMPTY', () => {
    const stateAuthAndEmpty = {
      ...stateNoAuthAndEmpty, UserData: {authorizationStatus: AuthorizationStatus.Auth},
    };
    const store = mockStore(stateAuthAndEmpty);

    it('test rout /favorites', () => {

      history.push(AppRoute.Favorites);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Favorite.Empty.Status)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Favorite.Empty.Description)).toBeInTheDocument();
    });
  });
});
