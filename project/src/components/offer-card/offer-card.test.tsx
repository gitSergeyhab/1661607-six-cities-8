import OfferCard from './offer-card';

import { makeFakeOffer } from '../../utils/test-mocks';
import { testCard } from '../../utils/test-utils';
import { offerCardProps } from '../favorite-card/favorite-card';
import { BtnType } from '../../constants';


const offer = makeFakeOffer();

const card =  <OfferCard offer={offer} btnType={BtnType.FavoriteCard} {...offerCardProps} />;

testCard(card, 'OfferCard');
