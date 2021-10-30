import { ChangeEvent, memo } from 'react';
import { STARS } from '../../constants';


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


type CommentFormStarsProps = ({onChange:  (evt: ChangeEvent<HTMLInputElement>) => void, isFormBlocked: boolean, rating: number})

function CommentFormStars({onChange, isFormBlocked, rating} : CommentFormStarsProps): JSX.Element {

  const stars = STARS.map((star) => (
    <RatingStar
      disabled={isFormBlocked}
      star={star}
      starsCount={rating}
      onChange={onChange}
      key={star.score}
    />));

  return (
    <div className="reviews__rating-form form__rating">
      {stars}
    </div>
  );
}

export default memo(CommentFormStars);
