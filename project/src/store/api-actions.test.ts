import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkLoginAction, fetchCommentsAction, fetchFavoriteHotelsAction, fetchHotelsAction, fetchNearbyHotelsAction, fetchOfferRoomAction, postCommentAction, postFavoriteStatus } from './api-actions';
import { State } from '../types/types';
import { APIRoute, AuthorizationStatus, BtnType, CITIES, RoomDataStatus } from '../constants';
import { changeMainOffers, changeRoomDataStatus, loadComments, loadFavoriteOffers, loadNearby, loadOffer, loadOffers, requireAuthorization } from './action';
import { makeFakeServerOffer, makeFakeServerCommentList, makeFakeServerOfferList } from '../utils/mocks';
import { adaptCommentFromServer, adaptHotelFromServer } from '../services/adapters';

const TEST_ID = 11;
const TEST_REVIEW = 'TEST_REVIEW';
const TEST_RATING = 3;
const TEST_STATUS = 1;

const fakeServerOffers = makeFakeServerOfferList();
const fakeClientOffers = fakeServerOffers.map((offer) => adaptHotelFromServer(offer));
const fakeServerComments = makeFakeServerCommentList();
const fakeClientComments = fakeServerComments.map((comment) => adaptCommentFromServer(comment));
const fakeServerOffer = makeFakeServerOffer();
const fakeClientOffer = adaptHotelFromServer(fakeServerOffer);


/* eslint-disable no-console */

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const onFakeNotFound = jest.fn();
  const api = createAPI(onFakeUnauthorized, onFakeNotFound);
  const mockAPI = new MockAdapter(api);
  const middleWares = [thunk.withExtraArgument(api)];

  type MockThunkDispatch = ThunkDispatch<State, typeof api, Action>;
  const mockStore = configureMockStore<State, Action, MockThunkDispatch>(middleWares);

  describe('AUTH', () => {
    it('checkLoginAction: should authorizationStatus is «Auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Login).reply(200, []);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(checkLoginAction());
      expect(store.getActions())
        .toEqual([requireAuthorization(AuthorizationStatus.Auth)]);
    });
  });


  describe('MAIN', () => {
    it('fetchHotelsAction: should dispatch loadOffers and changeMainOffers when GET /hotels', async () => {
      const store = mockStore({MainData: {city: CITIES[0]}});
      mockAPI.onGet(APIRoute.Hotels).reply(200, fakeServerOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchHotelsAction());
      expect(store.getActions())
        .toEqual([loadOffers(fakeClientOffers), changeMainOffers(CITIES[0])]);
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

    it('fetchOfferRoomAction: clearStatus=false: should dispatch changeRoomDataStatus, loadOffer when GET /hotels/id', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Hotels}/${TEST_ID}`).reply(200, fakeServerOffer);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchOfferRoomAction(TEST_ID, false));
      expect(store.getActions())
        .toEqual([changeRoomDataStatus(RoomDataStatus.Ok), loadOffer(fakeClientOffer)]);
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
    it('fetchFavoriteHotelsAction: should dispatch loadFavoriteOffers when GET /favorites/id', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Favorite).reply(200, fakeServerOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchFavoriteHotelsAction());
      expect(store.getActions())
        .toEqual([loadFavoriteOffers(fakeClientOffers)]);
    });
  });

  describe('BTN-FAVORITE', () => {

    const serverOffer = {...fakeServerOffer, id: TEST_ID};
    const clientOffer = {...fakeClientOffer, id: TEST_ID};
    const clientOffers = [...fakeClientOffers, clientOffer];

    const initState = {
      MainData: {city: CITIES[0], allOffers: clientOffers},
      RoomData: {nearby: clientOffers},
    };

    let store = mockStore({...initState});

    beforeEach(() => store = mockStore({...initState}));

    it('postFavoriteStatus: from MainCard: should dispatch loadOffers, changeMainOffers when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.MainCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeMainOffers(CITIES[0])]);
    });

    it('postFavoriteStatus: from FavoriteCard: should dispatch loadOffers, changeMainOffers when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.FavoriteCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeMainOffers(CITIES[0])]);
    });

    it('postFavoriteStatus: from Room: should dispatch loadOffers, changeMainOffers, loadOffer when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, TEST_ID, BtnType.Room));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeMainOffers(CITIES[0]), loadOffer(clientOffer)]);
    });

    it('postFavoriteStatus: from NearbyCard: should dispatch loadOffers, changeMainOffers, loadNearby when POST /favorites/id/status', async () => {

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, serverOffer);
      await store.dispatch(postFavoriteStatus(TEST_ID, TEST_STATUS, undefined, BtnType.NearbyCard));
      expect(store.getActions())
        .toEqual([loadOffers(clientOffers), changeMainOffers(CITIES[0]), loadNearby(clientOffers)]);
    });
  });
});
