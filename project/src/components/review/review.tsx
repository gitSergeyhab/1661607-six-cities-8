import {Comment} from '../../types/types';
import {getStarsWidth} from '../../utils/util';


function Review({commentObj: {comment, date, rating, user}}: {commentObj: Comment}): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">

            <span style={{width: getStarsWidth(rating)}}></span>

            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={(new Date(date).toDateString())}>{(new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'}))}</time>
      </div>
    </li>
  );
}

export default Review;
