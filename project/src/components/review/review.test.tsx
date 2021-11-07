import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/test-mocks';
import Review from './review';


const ALT_TEXT = /Reviews avatar/i;


const comment = makeFakeComment();
const commentText = comment.comment;
describe('Review Component', () => {
  it('should render commentText and altText "Reviews avatar"', () => {
    render(<Review comment={comment}/>);

    expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
    expect(screen.getByText(commentText)).toBeInTheDocument();
  },
  );
});
