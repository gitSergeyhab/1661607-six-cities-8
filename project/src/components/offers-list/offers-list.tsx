import {useState} from 'react';

import MainCard from '../main-card/main-card';

import {Offer} from '../../types/types';
import {TypeOfferCard} from '../../constants';


function OffersList({offers} : {offers: Offer[]}):JSX.Element {

  const [activeOfferId, setActiveOfferId]  = useState(-1);

  return (
    <>
      {offers.map((offer) => (
        <MainCard
          offer={offer}
          typeCard={TypeOfferCard.Main}
          onMouseLeave={() => {setActiveOfferId(-1);}}
          onMouseEnter={() => {setActiveOfferId(offer.id);}}
          key={offer.id}
        />))}

      {/* !! удалить !! */}
      <h2> иначе ругается на неиспользуемый activeOfferId <br/>{activeOfferId}</h2>

    </>
  );
}

export default OffersList;
