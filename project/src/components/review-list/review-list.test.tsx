/* ???
не работает - выдает :
TypeError: Actions must be plain objects. Use custom middleware for async actions.
???
*/

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { makeFakeCommentList } from '../../utils/mocks';
import ReviewList from './review-list';

const HOTEL_ID = 11;
const ALT_TEXT = /Reviews avatar/i;

const fakeComments = makeFakeCommentList();


const state = {RoomData: {comments: fakeComments}};
describe('OffersList Component', () => {

  const mockStore = configureMockStore();
  const store = mockStore(state);
  const history = createMemoryHistory();
  it('should render night, nights.length === offers.length', () => {
    const {getAllByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewList hotelId={HOTEL_ID} />;
        </Router>
      </Provider>,
    );

    const textElements: HTMLElement[] = getAllByText(ALT_TEXT);

    expect(textElements[0]).toBeInTheDocument();

    expect(textElements.length).toBe(fakeComments.length);
  });
});

