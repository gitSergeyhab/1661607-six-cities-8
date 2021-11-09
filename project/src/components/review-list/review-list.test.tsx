import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import ReviewList from './review-list';
import { stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { renderComponent } from '../../utils/test-utils';
import { Comment } from '../../types/types';
import { getSortedReviewsByDate } from '../../utils/date-util';


const REVIEW_TEXT_SELECTOR = '.reviews__text';
const MAX_COMMENTS_NUMBER = 10;

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);

const makeListLowerCase = (arr: string[]) => arr.map((item) => item.toLowerCase());

const getCommentsFromElements = (arr: HTMLElement[]) => makeListLowerCase(arr.map((element) => {
  const reviewText = element.querySelector(REVIEW_TEXT_SELECTOR)?.textContent;
  return reviewText ? reviewText : '';
}));

const getCommentsFromData = (arr: Comment[]) => makeListLowerCase(arr.map((item) => item.comment));

describe('ReviewList Component', () => {
  it('should render correctly', () => {

    const reviewList =<ReviewList hotelId={TEST_ID}/>;
    renderComponent(reviewList, store, history);

    const liElements = screen.queryAllByRole('listitem');
    const dataComments = getSortedReviewsByDate(stateAuthAndFilled.RoomData.comments).slice(0, MAX_COMMENTS_NUMBER);
    expect(liElements.length).toBe(dataComments.length);
    expect(getCommentsFromElements(liElements)).toEqual(getCommentsFromData(dataComments));
  });
});
