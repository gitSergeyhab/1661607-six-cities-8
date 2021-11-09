import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import OffersList from './offers-list';
import { makeFakeOfferList } from '../../utils/test-mocks';
import { initialStateAuth, renderComponent, CardText } from '../../utils/test-utils';


const offers = makeFakeOfferList();

describe('OffersList Component', () => {

  const offersList = <OffersList offers={offers} setOfferId={jest.fn()} />;
  const mockStore = configureMockStore();
  const store = mockStore(initialStateAuth);
  const history = createMemoryHistory();
  it('should render night, nights.length === offers.length', () => {

    const {getAllByText} = renderComponent(offersList, store, history);

    const textElements: HTMLElement[] = getAllByText(CardText.Content);

    expect(textElements[0]).toBeInTheDocument();

    expect(textElements.length).toBe(offers.length);
  });
});
