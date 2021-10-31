import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import FavoritesFilled from '../favorites-filled/favorites-filled';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Spinner from '../spinner/spinner';
import { fetchFavoriteHotelsAction } from '../../store/api-actions';
import { State, ThunkAppDispatch } from '../../types/types';
import { getFavoriteOffers, getFavoritesLoadedStatus } from '../../store/favorite-data/favorite-data-selectors';

const mapStateToProps = (state : State) => ({favoriteOffers: getFavoriteOffers(state), areFavoritesLoaded: getFavoritesLoadedStatus(state)});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({loadFavorites: fetchFavoriteHotelsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({favoriteOffers, areFavoritesLoaded, loadFavorites}: PropsFromRedux): JSX.Element {

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  if (!areFavoritesLoaded) {
    return <Spinner/>;
  }

  return favoriteOffers.length ?
    <FavoritesFilled offers={favoriteOffers} /> :
    <FavoritesEmpty/>;
}

export default connector(Favorites);
