import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import Review from '../review/review';
import { fetchCommentsAction } from '../../store/api-actions';
import { getComments } from '../../store/room-data/room-data-selectors';

/* eslint-disable no-console */


function ReviewList({hotelId} : {hotelId: number}): JSX.Element {
  console.log('ReviewList');


  const comments = useSelector(getComments);

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
