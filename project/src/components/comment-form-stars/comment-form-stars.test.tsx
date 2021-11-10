import userEvent from '@testing-library/user-event';
import CommentFormStars from './comment-form-stars';
import { render, screen } from '@testing-library/react';
import { STARS } from '../../constants';


const TEST_ID = 'comment-form-stars';
const RATING = 2;

describe('commentFormTextarea Component', () => {
  it('render correctly', () => {

    const onChange = jest.fn();
    render(<CommentFormStars onChange={onChange} rating={RATING} disabled={false}/>);

    const radioButtons = screen.queryAllByRole('radio');
    const firstBtn = radioButtons[0];

    expect(screen.queryByTestId(TEST_ID)).toBeInTheDocument();
    expect(radioButtons.length).toBe(STARS.length);
    expect(onChange).not.toBeCalled();

    userEvent.click(firstBtn);
    userEvent.click(firstBtn);
    expect(onChange).toBeCalledTimes(2);
  });
});
