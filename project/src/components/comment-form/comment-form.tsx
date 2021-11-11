import { ChangeEvent, FormEvent,  useCallback,  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CommentFormStars from '../comment-form-stars/comment-form-stars';
import CommentFormTextarea from '../comment-form-textarea/comment-form-textarea';
import { postCommentAction } from '../../store/api-actions';
import { disableByStarAndLength } from '../../utils/util';


const ERROR_DISPLAY_TIME = 2000;


function CommentForm({hotelId} : {hotelId: number}): JSX.Element {

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

  const dispatch = useDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    changeBlockForm(true);
    dispatch(postCommentAction({hotelId, review, rating, clearComment, notifyError, unBlockForm}));
  };


  const handleTextInput = useCallback( (evt: ChangeEvent<HTMLTextAreaElement>) =>  setReview(evt.target.value), [] ) ;
  const handleStarClick = useCallback( (evt: ChangeEvent<HTMLInputElement>) => setRating(+evt.currentTarget.value), [] );


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>

      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <CommentFormStars onChange={handleStarClick} disabled={isFormBlocked} rating={rating}/>

      <CommentFormTextarea onChange={handleTextInput} value={review} disabled={isFormBlocked}/>

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

export default CommentForm;
