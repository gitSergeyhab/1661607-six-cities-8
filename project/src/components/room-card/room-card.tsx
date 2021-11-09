import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';
import { BtnType } from '../../constants';


const offerCardProps = {infoClass: '', wrapperClass: 'cities__image-wrapper', imgWidth: '260', imgHeight: '200'};


function RoomCard({offer} : {offer: Offer}): JSX.Element {
  return (
    <article className="cities__place-card place-card">
      <OfferCard offer={offer} btnType={BtnType.NearbyCard} {...offerCardProps} />
    </article>
  );
}

export default RoomCard;
