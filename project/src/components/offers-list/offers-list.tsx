/* eslint-disable no-console */
import MainCard from '../main-card/main-card';
import {Offer} from '../../types/types';
import { TypeOfferCard } from '../../constants';

import {useState} from 'react';

console.log(1);

function OffersList({offers} : {offers: Offer[]}):JSX.Element {

  const [activeOfferId, stateActiveOfferId]  = useState(-1);
  return (
    <>
      {offers.map((offer) => (
        <MainCard
          offer={offer}
          typeCard={TypeOfferCard.Main}
          onMouseLeave={() => {stateActiveOfferId(-1);}}
          onMouseEnter={() => {stateActiveOfferId(offer.id);}}
          key={offer.id}
        />))}
      <h2> иначе ругается на неиспользуемый activeOfferId <br/>{activeOfferId}</h2>
    </>
  );
}

export default OffersList;
