import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../utils/test-utils';
import CommentForm from './comment-form';
import { AppRoute, STARS } from '../../constants';
import { ReviewLength } from '../../utils/util';


const TEXT = /Your review/i;
const TEXTAREA_TEST_ID = 'comment-form-textarea';

const testText = {
  tooSmall: new Array(ReviewLength.MIN - 1).fill('x').join(''), // на символ меньше минимального -> disabled=true
  addToOk: 'ok', // -> disabled=false
  addToTooBig: new Array(ReviewLength.MAX).fill('x').join(''), //-> disabled=true
};

const displayTestComment = new RegExp(testText.tooSmall, 'i');


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateAuthAndFilled);

describe('CommentForm Component', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Login);
    const loginForm = <CommentForm hotelId={TEST_ID} />;
    renderComponent(loginForm, store, history);

    //button - before
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).toHaveAttribute('disabled');

    //textarea
    expect(screen.getByText(TEXT)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(displayTestComment)).not.toBeInTheDocument();

    userEvent.type(screen.getByTestId(TEXTAREA_TEST_ID), testText.tooSmall);

    expect(screen.queryByDisplayValue(displayTestComment)).toBeInTheDocument();

    //stars
    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[STARS.length - 1];
    expect(radioButtons.length).toBe(STARS.length);
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
});
