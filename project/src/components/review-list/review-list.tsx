import Review from '../review/review';
import {Comment} from '../../types/types';


function ReviewList({comments} : {comments: Comment[]}): JSX.Element {
  return  (
    <ul className="reviews__list">
      {comments.map((comment) => <Review comment={comment} key={comment.id}/>)}
    </ul>
  );
}

export default ReviewList;
