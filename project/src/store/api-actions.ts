import { loadOffers, loadOffer, Actions, requireLogin, requireLogout, getOffers } from './action';
// import { saveToken, removeToken } from '../services/token';
import { APIRoute } from '../constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State, AuthData } from '../types/types';
import { AxiosInstance } from 'axios';
import { adaptHotelFromServer } from '../services/adapters';
import { removeToken, saveToken } from '../services/token';
import { store } from '../index';

import { City, Host } from '../types/types';


// const enum APIRoute {
//   Hotels = '/hotels',
//   Nearby = '/nearby',
//   Favorite = '/favorite',
//   Status = '/:status',
//   Comments = '/comments',
//   Login = '/login',
//   Logout = '/logout'
// }

/* eslint-disable no-console */

export type ServerOffer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type ThunkActionResult<R=Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.Hotels);
    const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
    dispatch(loadOffers(clientData));
    dispatch(getOffers(store.getState().city));
  };

//??? думаю, этот экшн не нужен, раз мы все отели и так сразу грузим - но тогда зачем вообще  GET /hotels/: id  ???
export const fetchHotelByIdAction = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const url = `${APIRoute.Hotels}/${hotelId}`;
    const {data} = await api.get(url);
    const clientData = adaptHotelFromServer(data);
    dispatch(loadOffer(clientData));
  };

export const loginAction = ({login: email, password} : AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data: {token}} = await api.post(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireLogin());
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireLogout());
  };

export const checkLoginAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login).then(() => dispatch(requireLogin()));
  };
