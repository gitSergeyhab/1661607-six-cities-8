import MainCard from '../main-card/main-card';
import {Offer} from '../../types/types';


type OfferListProps = {offers: Offer[], setOfferId: React.Dispatch<React.SetStateAction<number>>};

function OffersList({offers, setOfferId} : OfferListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <MainCard
          offer={offer}
          onMouseLeave={() => setOfferId(-1)}
          onMouseEnter={() => setOfferId(offer.id)}
          key={offer.id}
        />))}
    </>
  );
}

export default OffersList;
