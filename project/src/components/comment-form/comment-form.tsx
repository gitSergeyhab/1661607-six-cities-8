import {ChangeEvent, FormEvent, useState} from 'react';
import {STARS} from '../../constants';
import { disableReviewSubmit } from '../../utils/util';


type RatingStarProps = {
  star: {score: string, titleName: string},
  starsCount: string
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
}

function RatingStar({star: {score, titleName}, starsCount, onChange}: RatingStarProps) {

  const id = `${score}-stars`;

  return (
    <>
      <input
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

function CommentForm(): JSX.Element {

  const [review, setReview] = useState('');
  const [starsCount, setStarsCount] = useState('');

  const disabled = disableReviewSubmit(starsCount, review);

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setReview('');
        setStarsCount('');
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {STARS.map((star) => (
          <RatingStar
            star={star}
            starsCount={starsCount}
            onChange={() => setStarsCount(star.score)}
            key={star.score}
          />))}

      </div>

      <textarea
        value={review}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)}
        className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={disabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
