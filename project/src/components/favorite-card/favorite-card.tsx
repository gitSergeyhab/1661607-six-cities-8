
import OfferCard from '../offer-card/offer-card';

import {Offer} from '../../types/types';
import {TypeOfferCard} from '../../constants';


function FavoriteCard({offer}: {offer: Offer}): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <OfferCard offer={offer} typeCard={TypeOfferCard.Favorite}/>
    </article>
  );
}

export default FavoriteCard;
