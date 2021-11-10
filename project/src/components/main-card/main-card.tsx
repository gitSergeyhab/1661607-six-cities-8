import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';
import { BtnType } from '../../constants';


type MainCardProps = {
  offer: Offer,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

const offerCardProps = {infoClass: '', wrapperClass: 'cities__image-wrapper', imgWidth: '260', imgHeight: '200'};


function MainCard({offer, onMouseLeave, onMouseEnter}: MainCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <OfferCard offer={offer} btnType={BtnType.MainCard} {...offerCardProps} />
    </article>
  );
}

export default MainCard;
