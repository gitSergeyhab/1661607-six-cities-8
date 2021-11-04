
import { makeFakeOffer } from '../../utils/mocks';
import { testCard } from '../../utils/test-utils';
import FavoriteCard from './favorite-card';


const offer = makeFakeOffer();

const card =  <FavoriteCard offer={offer}/>;

testCard(card, 'FavoriteCard');


