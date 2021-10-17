import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';


const infoClass = 'favorites__card-info';
const wrapperClass = 'favorites__image-wrapper';
const [imgWidth, imgHeight] = ['150', '110'];

const offerCardProps = {infoClass, wrapperClass, imgWidth, imgHeight};

function FavoriteCard({offer}: {offer: Offer}): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <OfferCard offer={offer} {...offerCardProps}/>
    </article>
  );
}

export default FavoriteCard;
