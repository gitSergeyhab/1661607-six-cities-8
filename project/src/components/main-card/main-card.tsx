import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';
import {TypeOfferCard} from '../../constants';


type MainCardProps = {
  offer: Offer,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

function MainCard({offer, onMouseLeave, onMouseEnter}: MainCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <OfferCard offer={offer} typeCard={TypeOfferCard.Main}/>
    </article>
  );
}

export default MainCard;
