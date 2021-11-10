import { render, screen } from '@testing-library/react';

import Review from './review';
import { ScreenText } from '../../utils/test-constants';
import { makeFakeComment } from '../../utils/test-mocks';


const comment = makeFakeComment();
const commentText = comment.comment;

describe('Review Component', () => {
  it('should render commentText and altText "Reviews avatar"', () => {
    render(<Review comment={comment}/>);

    expect(screen.getByAltText(ScreenText.Comment.AltReviewAvatar)).toBeInTheDocument();
    expect(screen.getByText(commentText)).toBeInTheDocument();
  },
  );
});
