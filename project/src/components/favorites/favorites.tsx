import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FavoritesFilled from '../favorites-filled/favorites-filled';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Spinner from '../spinner/spinner';
import { fetchFavoriteHotelsAction } from '../../store/api-actions';
import { getFavoriteOffers, getFavoritesLoadedStatus } from '../../store/favorite-data/favorite-data-selectors';
import { getFavoritesErrorStatus } from '../../store/error-status/error-status-selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import { AuthorizationStatus } from '../../constants';


function Favorites(): JSX.Element {

  const favoriteOffers = useSelector(getFavoriteOffers);
  const areFavoritesLoaded = useSelector(getFavoritesLoadedStatus);
  const error = useSelector(getFavoritesErrorStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteHotelsAction());
  }, [dispatch]);

  if (error) {
    return <NotFoundPage authorizationStatus={AuthorizationStatus.Auth}/>;
  }

  if (!areFavoritesLoaded) {
    return <Spinner/>;
  }

  return favoriteOffers.length ?
    <FavoritesFilled offers={favoriteOffers} /> :
    <FavoritesEmpty/>;
}

export default Favorites;
