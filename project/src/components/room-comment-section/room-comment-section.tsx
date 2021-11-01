import {useSelector } from 'react-redux';

import CommentForm from '../comment-form/comment-form';
import ReviewList from '../review-list/review-list';
import { AuthorizationStatus} from '../../constants';
import { getComments } from '../../store/room-data/room-data-selectors';


type RoomCommentSectionProps = {authorizationStatus: AuthorizationStatus, id: number};

function RoomCommentSection({id, authorizationStatus} : RoomCommentSectionProps): JSX.Element {

  const comments = useSelector(getComments);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

      <ReviewList hotelId={id}/>

      {authorizationStatus === AuthorizationStatus.Auth && <CommentForm hotelId={id}/>}

    </section>
  );
}

export default RoomCommentSection;
