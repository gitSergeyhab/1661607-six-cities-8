import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import CommentForm from './comment-form';
import { renderComponent } from '../../utils/test-utils';
import { ReviewLength } from '../../utils/util';
import { postCommentAction } from '../../store/api-actions';
import { ScreenText, stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { AppRoute, STARS } from '../../constants';


const TEXTAREA_TEST_ID = 'comment-form-textarea';

const testText = {
  ok: new Array(ReviewLength.MIN + 1).fill('x').join(''),
  tooSmall: new Array(ReviewLength.MIN - 1).fill('x').join(''), // на символ меньше минимального -> disabled=true
  addToOk: 'ok', // -> disabled=false
  addToTooBig: new Array(ReviewLength.MAX).fill('x').join(''), //-> disabled=true
};

const displayTestComment = new RegExp(testText.tooSmall, 'i');


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);


describe('CommentForm Component', () => {
  history.push(AppRoute.Login);
  const loginForm = <CommentForm hotelId={TEST_ID} />;
  it('should render correctly', () => {
    renderComponent(loginForm, store, history);

    expect(screen.getByText(ScreenText.Room.Auth.YourReview)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(ScreenText.Comment.Placeholder)).toBeInTheDocument();
    expect(screen.queryAllByRole('radio').length).toBe(STARS.length);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });
  it('should input and checked correctly', () => {

    renderComponent(loginForm, store, history);

    //button - before
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toHaveAttribute('disabled');

    //textarea
    expect(screen.queryByDisplayValue(displayTestComment)).not.toBeInTheDocument();

    userEvent.type(screen.getByTestId(TEXTAREA_TEST_ID), testText.tooSmall);

    expect(screen.queryByDisplayValue(displayTestComment)).toBeInTheDocument();

    //stars
    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[STARS.length - 1];
    expect(lastBtn).toBeInTheDocument();
    expect(lastBtn).not.toBeChecked();

    userEvent.click(lastBtn);

    expect(lastBtn).toBeChecked();

    //button - after
    expect(submitBtn).toHaveAttribute('disabled');

    userEvent.type(screen.getByTestId(TEXTAREA_TEST_ID), testText.addToOk);

    expect(submitBtn).not.toHaveAttribute('disabled');

    userEvent.type(screen.getByTestId(TEXTAREA_TEST_ID), testText.addToTooBig);

    expect(submitBtn).toHaveAttribute('disabled');
  });

  it('should dispatch postCommentAction when click submit', () => {

    renderComponent(loginForm, store, history);

    userEvent.type(screen.getByTestId(TEXTAREA_TEST_ID), testText.ok);
    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[STARS.length - 1];
    userEvent.click(lastBtn);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('button'));

    const params = {
      hotelId: stateAuthAndFilled.RoomData.roomOffer.id,
      review: testText.ok,
      rating: STARS.length,
      clearComment: jest.fn(),
      notifyError: jest.fn(),
      unBlockForm: jest.fn(),
    };

    setTimeout(() => expect(store.getActions()).toEqual([postCommentAction(params)]), 0);
  });
});
