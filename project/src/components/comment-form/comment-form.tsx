import { ChangeEvent, FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postCommentAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/types';
import { disableByStarAndCommentLength } from '../../utils/util';
import { STARS } from '../../constants';


const TIME_ERROR_SHOWN = 2000;

type RatingStarProps = {
  star: {score: number, titleName: string},
  starsCount: number
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  disabled: boolean,
}

function RatingStar({star: {score, titleName}, starsCount, onChange, disabled}: RatingStarProps) {

  const id = `${score}-stars`;

  return (
    <>
      <input
        disabled={disabled}
        onChange={onChange}
        checked={score === starsCount}
        className="form__rating-input visually-hidden" name="rating" value={score} id={id} type="radio"
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={titleName}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}


function UsualSubmitBtn({disabled}: {disabled: boolean}): JSX.Element{
  return (
    <button className="reviews__submit form__submit button"  type="submit" disabled={disabled}>
    Submit
    </button>);
}

function ErrorSubmitBtn(): JSX.Element{
  return (
    <button className="reviews__submit form__submit button" style={{backgroundColor: 'red', color: 'black'}} type="submit" disabled>
      <b>can not send it, <br /> try again later</b>
    </button>);
}


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({postComment: postCommentAction}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CommentFormProps = PropsFromRedux & {hotelId: number};

function CommentForm({hotelId, postComment} : CommentFormProps): JSX.Element {

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isErrorSanding, setErrorSanding] = useState(false);
  const [isFormBlocked, changeBlockForm] = useState(false);

  const disabled = disableByStarAndCommentLength(rating, review);

  const unBlockForm = () => {
    changeBlockForm(false);
  };

  const clearComment = () => {
    setReview('');
    setRating(0);
  };

  const notifyError = () => {
    setErrorSanding(true);
    setTimeout(() => setErrorSanding(false), TIME_ERROR_SHOWN);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    changeBlockForm(true);
    postComment({hotelId, review, rating, clearComment, notifyError, unBlockForm});
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {STARS.map((star) => (
          <RatingStar
            disabled={isFormBlocked}
            star={star}
            starsCount={rating}
            onChange={() => setRating(star.score)}
            key={star.score}
          />))}

      </div>

      <textarea
        disabled={isFormBlocked}
        value={review}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)}
        className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {isErrorSanding ? <ErrorSubmitBtn /> : <UsualSubmitBtn disabled={disabled || isFormBlocked}/>}
      </div>
    </form>
  );
}

export default connector(CommentForm);
