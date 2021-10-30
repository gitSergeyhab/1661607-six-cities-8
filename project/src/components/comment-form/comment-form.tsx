import { ChangeEvent, FormEvent,  useCallback,  useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postCommentAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/types';
import { disableByStarAndLength } from '../../utils/util';
import CommentFormStars from '../comment-form-stars/comment-form-stars';
import CommentFormTextarea from '../comment-form-textarea/comment-form-textarea';


const ERROR_DISPLAY_TIME = 2000;


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({postComment: postCommentAction}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CommentFormProps = PropsFromRedux & {hotelId: number};

function CommentForm({hotelId, postComment} : CommentFormProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('CommentForm');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isErrorSanding, setErrorSanding] = useState(false);
  const [isFormBlocked, changeBlockForm] = useState(false);

  const isDisabledByReviewCondition = disableByStarAndLength(rating, review);

  const unBlockForm = () => {
    changeBlockForm(false);
  };

  const clearComment = () => {
    setReview('');
    setRating(0);
  };

  let errorTimeout: NodeJS.Timeout | null = null;
  const notifyError = () => {
    setErrorSanding(true);
    errorTimeout = setTimeout(() => setErrorSanding(false), ERROR_DISPLAY_TIME);
  };

  useEffect(() => function cleanup () {
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
  }, [errorTimeout]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    changeBlockForm(true);
    postComment({hotelId, review, rating, clearComment, notifyError, unBlockForm});
    // ??? похоже, если CommentForm удаляется до выполнения postComment вылезает ошибка
    /*Warning: Can't perform a React state update on an unmounted component.
    his is a no-op, but it indicates a memory leak in your application.
    To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. */
    // видимо, нужно в useEffect как-то остановить выполнение postComment - но как ???
  };


  const handleTextInput = useCallback( (evt: ChangeEvent<HTMLTextAreaElement>) =>  setReview(evt.target.value), [] ) ;
  const handleStarClick = useCallback( (evt: ChangeEvent<HTMLInputElement>) => setRating(+evt.currentTarget.value), [] );


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>

      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <CommentFormStars onChange={handleStarClick} isFormBlocked={isFormBlocked} rating={rating}/>

      <CommentFormTextarea onChange={handleTextInput} review={review} isFormBlocked={isFormBlocked}/>

      {isErrorSanding && <span style={{color: 'red', fontWeight: 'bold'}}>be careful! you broke everything... but we will fix it. Try again later</span>}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledByReviewCondition || isFormBlocked}>Submit</button>
      </div>

    </form>
  );
}

export default connector(CommentForm);
