import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { checkLoginAction, fetchCommentsAction, fetchFavoriteHotelsAction, fetchHotelsAction, fetchNearbyHotelsAction, fetchOfferRoomAction, loginAction, logoutAction, postCommentAction, postFavoriteStatus } from './api-actions';
import { AuthData, State } from '../types/types';
import { changeCityAndSorting, changeFavoritesErrorStatus, changeMainErrorStatus, changeMainOffers, changeRoomDataStatus, changeRoomErrorStatus, loadComments, loadFavoriteOffers, loadNearby, loadOffer, loadOffers, requireAuthorization, requireLogout } from './action';
import { makeFakeServerOffer, makeFakeServerCommentList, makeFakeServerOfferList } from '../utils/test-mocks';
import { adaptCommentFromServer, adaptHotelFromServer } from '../services/adapters';
import { removeToken, saveToken } from '../services/token';
import { removeAvatar, removeUserEmail, saveAvatar, saveUserEmail} from '../services/user-info';
import { APIRoute, AuthorizationStatus, BtnType, CITIES, RoomDataStatus, SortOption } from '../constants';
import { TEST_ID } from '../utils/test-constants';


const TEST_REVIEW = 'TEST_REVIEW';
const TEST_RATING = 3;
const TEST_STATUS = 1;
const TEST_TOKEN = 'TEST_TOKEN';
const TEST_AVATAR = 'avatar_url';


const testAuthData: AuthData = {email: 'test@mail.com', password: 'test-pa5Sword'};

jest.mock('../services/token', () => ({
  __esModule: true,
  saveToken: jest.fn(),
  getToken: jest.fn(),
  removeToken: jest.fn(),
}),
);

jest.mock('../services/user-info', () => ({
  __esModule: true,
  saveUserEmail: jest.fn(),
  getUserEmail: jest.fn(),
  removeUserEmail: jest.fn(),
  saveAvatar: jest.fn(),
  getAvatar: jest.fn(),
  removeAvatar: jest.fn(),
}),
);

const fakeServerOffers = makeFakeServerOfferList();
const fakeClientOffers = fakeServerOffers.map((offer) => adaptHotelFromServer(offer));
const fakeServerComments = makeFakeServerCommentList();
const fakeClientComments = fakeServerComments.map((comment) => adaptCommentFromServer(comment));
const fakeServerOffer = makeFakeServerOffer();
const fakeClientOffer = adaptHotelFromServer(fakeServerOffer);

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized);
  const mockAPI = new MockAdapter(api);
  const middleWares = [thunk.withExtraArgument(api)];

  type MockThunkDispatch = ThunkDispatch<State, typeof api, Action>;
  const mockStore = configureMockStore<State, Action, MockThunkDispatch>(middleWares);

  describe('AUTH', () => {
    it('checkLoginAction: should authorizationStatus is ??Auth?? when server return 200', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Login).reply(200, []);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(checkLoginAction());
      expect(store.getActions())
        .toEqual([requireAuthorization(AuthorizationStatus.Auth)]);
    });

    it('loginAction: should dispatch requireAuthorization and to called saveToken, saveUserEmail', async () => {

      const store = mockStore();
      mockAPI.onPost(APIRoute.Login).reply(200, {token: TEST_TOKEN, email: testAuthData.email, [TEST_AVATAR]: TEST_AVATAR});
      expect(store.getActions()).toEqual([]);
      await store.dispatch(loginAction(testAuthData));

      expect(store.getActions()).toEqual([requireAuthorization(AuthorizationStatus.Auth)]);

      expect(saveToken).toBeCalledTimes(1);
      expect(saveToken).toBeCalledWith(TEST_TOKEN);

      expect(saveUserEmail).toBeCalledTimes(1);
      expect(saveUserEmail).toBeCalledWith(testAuthData.email);

      expect(saveAvatar).toBeCalledTimes(1);
      expect(saveAvatar).toBeCalledWith(TEST_AVATAR);
    });

    it('logoutAction: should dispatch requireLogout and to called removeToken, removeUserEmail', async () => {

      const store = mockStore();
      mockAPI.onDelete(APIRoute.Logout).reply(204, []);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(logoutAction());

      expect(store.getActions()).toEqual([requireLogout()]);

      expect(removeToken).toBeCalledTimes(1);
      expect(removeUserEmail).toBeCalledTimes(1);
      expect(removeAvatar).toBeCalledTimes(1);
    });
  });


  describe('MAIN', () => {
    it('fetchHotelsAction: should dispatch loadOffers, changeMainOffers and changeMainErrorStatus when GET /hotels', async () => {
      const store = mockStore({MainData: {city: CITIES[0]}});
      mockAPI.onGet(APIRoute.Hotels).reply(200, fakeServerOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchHotelsAction());
      expect(store.getActions())
        .toEqual([loadOffers(fakeClientOffers), changeMainOffers(CITIES[0]), changeMainErrorStatus(false)]);
    });
  });


  describe('ROOM', () => {

    it('fetchNearbyHotelsAction: should dispatch loadNearby when GET /hotels/id/nearby', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Hotels}/${TEST_ID}${APIRoute.Nearby}`).reply(200, fakeServerOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchNearbyHotelsAction(TEST_ID));
      expect(store.getActions())
        .toEqual([loadNearby(fakeClientOffers)]);
    });

    it('fetchOfferRoomAction: should dispatch changeRoomDataStatus, loadOffer and changeRoomErrorStatus when GET /hotels/id', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Hotels}/${TEST_ID}`).reply(200, fakeServerOffer);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchOfferRoomAction(TEST_ID, false));
      expect(store.getActions())
        .toEqual([changeRoomDataStatus(RoomDataStatus.Ok), loadOffer(fakeClientOffer), changeRoomErrorStatus(false)]);
    });

    it('fetchCommentsAction: should dispatch loadComments when GET /comments/id', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Comments}/${TEST_ID}`).reply(200, fakeServerComments);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchCommentsAction(TEST_ID));
      expect(store.getActions())
        .toEqual([loadComments(fakeClientComments)]);
    });

    // Room - Post
    it('postCommentAction: should dispatch loadComments when POST /comments/id', async() => {
      const store = mockStore();
      mockAPI.onPost(`${APIRoute.Comments}/${TEST_ID}`).reply(200,  fakeServerComments);
      await store.dispatch(postCommentAction({
        hotelId: TEST_ID,
        review: TEST_REVIEW,
        rating: TEST_RATING,
        clearComment: jest.fn(),
        notifyError: jest.fn(),
        unBlockForm: jest.fn(),
      }),
      );
      expect(store.getActions())
        .toEqual([loadComments(fakeClientComments)]);
    });
  });

  describe('FAVORITES', () => {
    it('fetchFavoriteHotelsAction: should dispatch loadFavoriteOffers and changeFavoritesErrorStatus when GET /favorites/id', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Favorite).reply(200, fakeServerOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchFavoriteHotelsAction());
      expect(store.getActions())
        .toEqual([loadFavoriteOffers(fakeClientOffers), changeFavoritesErrorStatus(false)]);
    });
  });

  describe('BTN-FAVORITE', () => {

    const serverOffer = {...fakeServerOffer, id: TEST_ID};
    const clientOffer = {...fakeClientOffer, id: TEST_ID};
    const clientOffers = [...fakeClientOffers, clientOffer];

    const initState = {
      MainData: {city: CITIES[0], allOffers: clientOffers, activeOption: SortOption.Popular},
      RoomData: {nearby: clientOffers},
    };

    let store = mockStore({...initState});

    beforeEach(() => store = mockStore({...initState}));

    it('postFavoriteStatus: from MainCard: should dispatch loadOffers, changeMainOffers when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.MainCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeCityAndSorting()]);
    });

    it('postFavoriteStatus: from FavoriteCard: should dispatch loadOffers, changeMainOffers when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.FavoriteCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeCityAndSorting()]);
    });

    it('postFavoriteStatus: from Room: should dispatch loadOffers, changeMainOffers, loadOffer when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, TEST_ID, BtnType.Room));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeCityAndSorting(), loadOffer(clientOffer)]);
    });

    it('postFavoriteStatus: from NearbyCard: should dispatch loadOffers, changeMainOffers, loadNearby when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.NearbyCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeCityAndSorting(), loadNearby(clientOffers)]);
    });
  });
});
