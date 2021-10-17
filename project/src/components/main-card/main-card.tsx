import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';


type MainCardProps = {
  offer: Offer,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

const INFO_CLASS = '';
const WRAPPER_CLASS = 'cities__image-wrapper';
const [IMG_WIDTH, IMG_HIGHT] = ['260', '200'];

const offerCardProps = {infoClass: INFO_CLASS, wrapperClass: WRAPPER_CLASS, imgWidth: IMG_WIDTH, imgHeight: IMG_HIGHT};

function MainCard({offer, onMouseLeave, onMouseEnter}: MainCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <OfferCard offer={offer} {...offerCardProps}/>
    </article>
  );
}

export default MainCard;
