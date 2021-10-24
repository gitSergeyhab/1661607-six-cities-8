import { loadOffers, requireAuthorization, requireLogout, getOffers} from './action';
import { adaptHotelFromServer } from '../services/adapters';
import { removeToken, saveToken } from '../services/token';
import { ServerOffer, ThunkActionResult, AuthData } from '../types/types';
import { APIRoute, AuthorizationStatus } from '../constants';


export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.Hotels);
    const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
    dispatch(loadOffers(clientData));
    dispatch(getOffers(getState().city));
  };

export const checkLoginAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login).then(() => dispatch(requireAuthorization(AuthorizationStatus.Auth)));
  };

export const loginAction = ({email, password} : AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const response = await api.post(APIRoute.Login, {email, password});
    const {data} = response;
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireLogout());
  };


