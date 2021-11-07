import RoomCard from './room-card';

import { makeFakeOffer } from '../../utils/test-mocks';
import { testCard } from '../../utils/test-utils';

const offer = makeFakeOffer();

const card =  <RoomCard offer={offer} />;

testCard(card, 'MainCard');
