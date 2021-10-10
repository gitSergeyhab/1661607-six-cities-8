import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';


type MainCardProps = {
  offer: Offer,
  typeCard: string,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

function MainCard({offer, typeCard, onMouseLeave, onMouseEnter}: MainCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <OfferCard offer={offer} typeCard={typeCard}/>
    </article>
  );
}

export default MainCard;
