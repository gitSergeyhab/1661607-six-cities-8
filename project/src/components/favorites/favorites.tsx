import FavoritesFilled from '../favorites-filled/favorites-filled';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

import {Offer, ThunkAppDispatch} from '../../types/types';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { fetchFavoriteHotelsAction } from '../../store/api-actions';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = ({favoriteOffers} : {favoriteOffers: Offer[]}) => ({favoriteOffers});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({loadFavorites: fetchFavoriteHotelsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({favoriteOffers, loadFavorites}: PropsFromRedux): JSX.Element {

  useEffect(() => {
    loadFavorites();
  });

  return favoriteOffers.length ?
    <FavoritesFilled offers={favoriteOffers} /> :
    <FavoritesEmpty/>;
}

export default connector(Favorites);
