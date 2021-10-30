import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import Review from '../review/review';
import { fetchCommentsAction } from '../../store/api-actions';
import { Comment, ThunkAppDispatch } from '../../types/types';


const mapStateToProps = ({comments} : {comments: Comment[]}) => ({comments});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({loadComments: fetchCommentsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ReviewListProps = PropsFromRedux & {hotelId: number}


function ReviewList({hotelId, comments, loadComments} : ReviewListProps): JSX.Element {

  /* eslint-disable no-console */
  console.log('ReviewList');
  console.log(comments);


  useEffect(() => {
    loadComments(hotelId);
  }, [hotelId, loadComments]);

  return  (
    <ul className="reviews__list">
      {comments.map((comment) => <Review comment={comment} key={comment.id}/>)}
    </ul>
  );
}

export default connector(ReviewList);
