import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';


type MainCardProps = {
  offer: Offer,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

const infoClass = '';
const wrapperClass = 'cities__image-wrapper';
const [imgWidth, imgHeight] = ['260', '200'];

const offerCardProps = {infoClass, wrapperClass, imgWidth, imgHeight};

function MainCard({offer, onMouseLeave, onMouseEnter}: MainCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <OfferCard offer={offer} {...offerCardProps}/>
    </article>
  );
}

export default MainCard;
