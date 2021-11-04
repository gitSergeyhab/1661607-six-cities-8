import { loadOffers, loadOffer, requireAuthorization, requireLogout, changeMainOffers, loadNearby, loadComments, loadFavoriteOffers, changeRoomDataStatus} from './action';
import { adaptHotelFromServer, adaptCommentFromServer } from '../services/adapters';
import { removeToken, saveToken } from '../services/token';
import { ServerOffer, ThunkActionResult, AuthData, ServerComment, Offer } from '../types/types';
import { removeUserEmail, saveUserEmail } from '../services/user-email';
import { APIRoute, AuthorizationStatus, BtnType, RoomDataStatus } from '../constants';


// Authorization
export const checkLoginAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const loginAction = ({email, password} : AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const response = await api.post(APIRoute.Login, {email, password});
    const {data} = response;
    saveToken(data.token);
    saveUserEmail(data.email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    removeToken();
    removeUserEmail();
    dispatch(requireLogout());
  };


// Main
export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.Hotels);
    const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
    dispatch(loadOffers(clientData));
    dispatch(changeMainOffers(getState().MainData.city));
  };


// Room - Get
export const fetchNearbyHotelsAction = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get(`${APIRoute.Hotels}/${hotelId}${APIRoute.Nearby}`);
    const clientData = await data.map((offer: ServerOffer) => adaptHotelFromServer(offer));
    dispatch(loadNearby(clientData));
  };

export const fetchOfferRoomAction = (hotelId: number, clearStatus = true): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    if (clearStatus) { // true - всегда, кроме postFavoriteStatus
      dispatch(changeRoomDataStatus(RoomDataStatus.Loading));
    }
    const {data} = await api.get(`${APIRoute.Hotels}/${hotelId}`);
    const clientData = adaptHotelFromServer(data);
    dispatch(changeRoomDataStatus(RoomDataStatus.Ok)); // убрать спиннер

    dispatch(loadOffer(clientData));
  };

export const fetchCommentsAction = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<ServerComment[]>(`${APIRoute.Comments}/${hotelId}`);
    const clientComment = await data.map((comment) => adaptCommentFromServer(comment));
    dispatch(loadComments(clientComment));
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
        clearComment(); // set 0 star and '' review
      })
      .catch(notifyError) // made red message for 2 sec
      .finally(unBlockForm);
  };


// Favorites
export const fetchFavoriteHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    const clientOffers = data.map((serverOffer) => adaptHotelFromServer(serverOffer));
    dispatch(loadFavoriteOffers(clientOffers));
  };


// All  (btn-favorite)

export const postFavoriteStatus = (hotelId: number, status: number, roomId = 0, btnType: BtnType): ThunkActionResult =>
  async (dispatch, getState, api) => {
    const {data} = await api.post(`${APIRoute.Favorite}/${hotelId}/${status}`);
    const {id} = data;
    const isFavorite = data['is_favorite'];
    const allOffers = getState().MainData.allOffers;
    const offerIndex = allOffers.findIndex((offer) => offer.id === id); //??? или можно не искать, а считать, что offerIndexWithNewStatus === id ???

    if (offerIndex === -1) {
      throw new Error(`there is not hotel with id ${id}`);
    }

    const changedOffer = {...allOffers[offerIndex], isFavorite};
    const newOffers = [...allOffers.slice(0, offerIndex), changedOffer, ...allOffers.slice(offerIndex + 1)];
    dispatch(loadOffers(newOffers));
    dispatch(changeMainOffers(getState().MainData.city));

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
  };
