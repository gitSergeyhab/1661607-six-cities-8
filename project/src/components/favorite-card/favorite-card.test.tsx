import FavoriteCard from './favorite-card';
import { makeFakeOffer } from '../../utils/test-mocks';
import { testCard } from '../../utils/test-utils';


const offer = makeFakeOffer();

const card =  <FavoriteCard offer={offer}/>;

testCard(card, 'FavoriteCard');


