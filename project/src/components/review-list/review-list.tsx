import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Review from '../review/review';
import { fetchCommentsAction } from '../../store/api-actions';
import { getCommentsForRender } from '../../store/room-data/room-data-selectors';


function ReviewList({hotelId} : {hotelId: number}): JSX.Element {

  const comments = useSelector(getCommentsForRender);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(hotelId));
  }, [dispatch, hotelId]);

  return  (
    <ul className="reviews__list">
      {comments.map((comment) => <Review comment={comment} key={comment.id}/>)}
    </ul>
  );
}

export default ReviewList;
