import { connect } from 'react-redux';

import CommentForm from '../comment-form/comment-form';
import ReviewList from '../review-list/review-list';
import { Comment, State } from '../../types/types';
import { AuthorizationStatus} from '../../constants';
import { getComments } from '../../store/room-data/room-data-selectors';


const mapStateToProps = (state : State) => ({comments: getComments(state)});

type RoomCommentSectionProps = {authorizationStatus: AuthorizationStatus, id: number, comments: Comment[]};

function RoomCommentSection({id, authorizationStatus, comments} : RoomCommentSectionProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('RoomCommentSection');

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

      <ReviewList hotelId={id}/>

      {authorizationStatus === AuthorizationStatus.Auth && <CommentForm hotelId={id}/>}

    </section>
  );
}

export default connect(mapStateToProps)(RoomCommentSection);
