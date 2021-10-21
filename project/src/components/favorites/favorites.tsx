import FavoritesFilled from '../favorites-filled/favorites-filled';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

import {Offer} from '../../types/types';


function Favorites({offers}: {offers: Offer[]}): JSX.Element {

  const favorites = offers.filter((offer) => offer.isFavorite); // GET /favorite

  return favorites.length ?
    <FavoritesFilled offers={favorites} /> :
    <FavoritesEmpty/>;
}

export default Favorites;
