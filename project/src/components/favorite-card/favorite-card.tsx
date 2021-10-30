import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';


const INFO_CLASS = 'favorites__card-info';
const WRAPPER_CLASS = 'favorites__image-wrapper';
const [IMG_WIDTH, IMG_HIGHT] = ['150', '110'];

const offerCardProps = {infoClass: INFO_CLASS, wrapperClass: WRAPPER_CLASS, imgWidth: IMG_WIDTH, imgHeight: IMG_HIGHT};

function FavoriteCard({offer}: {offer: Offer}): JSX.Element {
  /* eslint-disable no-console */
  console.log('FavoriteCard');
  return (
    <article className="favorites__card place-card">
      <OfferCard offer={offer} {...offerCardProps} nearbyRoomId={0}/>
    </article>
  );
}

export default FavoriteCard;
