import Header from '../header/header';
import FavoriteBtn from '../favorite-btn/favorite-btn';
import MainCard from '../main-card/main-card';

import {Offer, Comment} from '../../types/types';
import {FavoriteBtnProp, STARS} from '../../constants';
import {getStarsWidth} from '../../util';


function PremiumMarker() {
  return <div className="property__mark"><span>Premium</span></div>;
}

function ApartmentPicture({src}: {src: string}) {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={src} alt="studio"/>
    </div>
  );
}

function Good({goodName}: {goodName: string}) {
  return <li className="property__inside-item">{goodName}</li>;
}

function RatingStar({star: {score, titleName}}: {star: {score: string, titleName: string}}) {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={score} id={`${score}-stars`} type="radio"/>
      <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={titleName}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

function Review({commentObj: {comment, date, rating, user}}: {commentObj: Comment}) {
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

function Room({offer, comments, neighbours}: {offer: Offer, comments: Comment[], neighbours: Offer[]}): JSX.Element {

  const {isPremium, price, isFavorite, title, rating, type, host, description, maxAdults, bedrooms, goods, images} = offer;

  return (
    <div className="page">

      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {images.map((image) => <ApartmentPicture src={image} key={image}/>)}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium ? <PremiumMarker/> : null}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                <FavoriteBtn isFavorite={isFavorite} btn={FavoriteBtnProp.PROPERTY}/>

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getStarsWidth(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {goods.map((good) => <Good goodName={good} key={good}/>)}

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">

                    {host.isPro ? 'Pro' : ''}

                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">

                  {comments.map((comment) => <Review commentObj={comment} key={comment.id}/>)}

                </ul>
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">

                    {STARS.map((star) => <RatingStar star={star} key={star.score}/>)}

                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {neighbours.map((neighbour) => <MainCard offer={neighbour} key={neighbour.id}/>)}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
