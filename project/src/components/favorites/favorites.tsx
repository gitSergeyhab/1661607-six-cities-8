import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FavoritesFilled from '../favorites-filled/favorites-filled';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Spinner from '../spinner/spinner';
import { fetchFavoriteHotelsAction } from '../../store/api-actions';
import { getFavoriteOffers, getFavoritesLoadedStatus } from '../../store/favorite-data/favorite-data-selectors';

function Favorites(): JSX.Element {

  const favoriteOffers = useSelector(getFavoriteOffers);
  const areFavoritesLoaded = useSelector(getFavoritesLoadedStatus);

  const dispatch = useDispatch();
  const loadFavorites = () => dispatch(fetchFavoriteHotelsAction());

  useEffect(() => {
    loadFavorites();
  }, []);

  if (!areFavoritesLoaded) {
    return <Spinner/>;
  }

  return favoriteOffers.length ?
    <FavoritesFilled offers={favoriteOffers} /> :
    <FavoritesEmpty/>;
}

export default Favorites;
