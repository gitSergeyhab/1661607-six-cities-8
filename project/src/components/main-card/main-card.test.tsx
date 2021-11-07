
import { makeFakeOffer } from '../../utils/test-mocks';
import { testCard } from '../../utils/test-utils';
import MainCard from './main-card';


const offer = makeFakeOffer();

const card =  <MainCard offer={offer} onMouseEnter={jest.fn()} onMouseLeave={jest.fn()}/>;

testCard(card, 'MainCard');


