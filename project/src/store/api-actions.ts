import { toast } from 'react-toastify';

import { loadOffers, loadOffer, requireAuthorization, requireLogout, changeMainOffers, loadNearby, loadComments, loadFavoriteOffers, changeRoomDataStatus, changeCityAndSorting, changeMainErrorStatus, changeRoomErrorStatus, changeFavoritesErrorStatus} from './action';
import { adaptHotelFromServer, adaptCommentFromServer } from '../services/adapters';
import { removeToken, saveToken } from '../services/token';
import { ServerOffer, ThunkActionResult, AuthData, ServerComment, Offer } from '../types/types';
import { removeAvatar, removeUserEmail, saveAvatar, saveUserEmail } from '../services/user-info';
import { APIRoute, AuthorizationStatus, BtnType, RoomDataStatus } from '../constants';


const ErrorMessage = {
  Login: 'unable to log in',
  Logout: 'unable to log out',
  FetchHotels: 'unable to upload offers',
  FetchNearby: 'unable to upload nearby offers',
  FetchOfferRoom: 'unable to upload this offer',
  FetchComments: 'unable to upload comments',
  FetchFavorite: 'unable to upload favorite offers',
  PostComments: 'unable to send comment',
  PostFavorite: 'unable to change favorite status',
};

const AVATAR_URL_FIELD = 'avatar_url';


// Authorization
export const checkLoginAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const loginAction = ({email, password} : AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.post(APIRoute.Login, {email, password});
      const {data} = response;
      saveToken(data.token);
      saveUserEmail(data.email);
      saveAvatar(data[AVATAR_URL_FIELD]);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.error(ErrorMessage.Login);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      await api.delete(APIRoute.Logout);
      removeToken();
      removeUserEmail();
      removeAvatar();
      dispatch(requireLogout());
      dispatch(fetchHotelsAction());
      const offer = getState().RoomData.roomOffer;
      if (offer) {
        dispatch(fetchOfferRoomAction(offer.id));
      }
    } catch {
      toast.error(ErrorMessage.Logout);
    }
  };


// Main
export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const {data} = await api.get(APIRoute.Hotels);
      const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
      dispatch(loadOffers(clientData));
      dispatch(changeMainOffers(getState().MainData.city));
      dispatch(changeMainErrorStatus(false));
    } catch {
      dispatch(changeMainErrorStatus(true));
      toast.error(ErrorMessage.FetchHotels);
    }
  };


// Room - Get
export const fetchNearbyHotelsAction = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get(`${APIRoute.Hotels}/${hotelId}${APIRoute.Nearby}`);
      const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
      dispatch(loadNearby(clientData));
    } catch {
      toast.warning(ErrorMessage.FetchNearby);
    }
  };

export const fetchOfferRoomAction = (hotelId: number, clearStatus = true): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      if (clearStatus) {
        dispatch(changeRoomDataStatus(RoomDataStatus.Loading));
      }
      const {data} = await api.get(`${APIRoute.Hotels}/${hotelId}`);
      const clientData = adaptHotelFromServer(data);
      dispatch(changeRoomDataStatus(RoomDataStatus.Ok));
      dispatch(loadOffer(clientData));
      dispatch(changeRoomErrorStatus(false));
    } catch {
      dispatch(changeRoomErrorStatus(true));
      toast.error(ErrorMessage.FetchOfferRoom);
    }
  };

export const fetchCommentsAction = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<ServerComment[]>(`${APIRoute.Comments}/${hotelId}`);
      const clientComment = await data.map((comment) => adaptCommentFromServer(comment));
      dispatch(loadComments(clientComment));
    } catch {
      toast.warning(ErrorMessage.FetchComments);
    }
  };


// Room - Post
type PostCommentArguments = {hotelId: number, review: string, rating: number, clearComment: () => void, notifyError: () => void, unBlockForm: () => void}

export const postCommentAction = ({hotelId, review, rating, clearComment, notifyError, unBlockForm}: PostCommentArguments): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<ServerComment[]>(`${APIRoute.Comments}/${hotelId}`, {comment: review, rating})
      .then((result) => {
        const {data} = result;
        const clientComment = data.map((serverComment) => adaptCommentFromServer(serverComment));
        dispatch(loadComments(clientComment));
        clearComment();
      })
      .catch(notifyError)
      .finally(unBlockForm);
  };


// Favorites
export const fetchFavoriteHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      const clientOffers = data.map((serverOffer) => adaptHotelFromServer(serverOffer));
      dispatch(loadFavoriteOffers(clientOffers));
      dispatch(changeFavoritesErrorStatus(false));
    } catch {
      dispatch(changeFavoritesErrorStatus(true));
      toast.error(ErrorMessage.FetchFavorite);
    }
  };


// All  (btn-favorite)

export const postFavoriteStatus = (hotelId: number, status: number, roomId = 0, btnType: BtnType): ThunkActionResult =>
  async (dispatch, getState, api) => {
    try {
      const {data} = await api.post(`${APIRoute.Favorite}/${hotelId}/${status}`);
      const {id} = data;
      const isFavorite = data['is_favorite'];
      const allOffers = getState().MainData.allOffers;
      const offerIndex = allOffers.findIndex((offer) => offer.id === id);

      if (offerIndex === -1) {
        throw new Error(`there is not hotel with id ${id}`);
      }

      const changedOffer = {...allOffers[offerIndex], isFavorite};
      const newOffers = [...allOffers.slice(0, offerIndex), changedOffer, ...allOffers.slice(offerIndex + 1)];
      dispatch(loadOffers(newOffers));
      dispatch(changeCityAndSorting());

      if (roomId) {
        dispatch(loadOffer(changedOffer));
      }

      if (btnType === BtnType.NearbyCard) {
        const nearbyOffers = getState().RoomData.nearby;
        const nearbyIndex = nearbyOffers.findIndex((offer) => offer.id === id);
        const newNearby = [...nearbyOffers.slice(0, nearbyIndex), changedOffer, ...nearbyOffers.slice(nearbyIndex + 1)];
        dispatch(loadNearby(newNearby));
      }

      if (btnType === BtnType.FavoriteCard) {
        dispatch(fetchFavoriteHotelsAction());
      }
    } catch {
      toast.error(ErrorMessage.PostFavorite);
    }
  };


