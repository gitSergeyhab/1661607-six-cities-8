import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';
import { BtnType } from '../../constants';


export const offerCardProps = {
  infoClass: 'favorites__card-info',
  wrapperClass: 'favorites__image-wrapper',
  imgWidth: '150',
  imgHeight: '110',
};


function FavoriteCard({offer}: {offer: Offer}): JSX.Element {

  return (
    <article className="favorites__card place-card">
      <OfferCard offer={offer} btnType={BtnType.FavoriteCard} {...offerCardProps} />
    </article>
  );
}

export default FavoriteCard;
