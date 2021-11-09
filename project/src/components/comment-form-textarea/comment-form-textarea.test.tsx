import { render, screen } from '@testing-library/react';
import CommentFormTextarea from './comment-form-textarea';


const VALUE = 'comment-form-textarea';
const displayValue = new RegExp(VALUE, 'i');


describe('commentFormTextarea Component', () => {
  it('render correctly', () => {

    render(<CommentFormTextarea onChange={jest.fn()} value={VALUE} disabled={false}/>);

    expect(screen.queryByTestId(VALUE)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(displayValue)).toBeInTheDocument();
  });
});

