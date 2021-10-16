import {useParams} from 'react-router';

import CommentForm from '../comment-form/comment-form';
import FavoriteBtn from '../favorite-btn/favorite-btn';
import Header from '../header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import OffersList from '../offers-list/offers-list';

import {Offer, Comment} from '../../types/types';
import {getStarsWidth} from '../../utils/util';
import {AuthorizationStatus, FavoriteBtnProp} from '../../constants';
import { useState } from 'react';


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


type RoomProps = {offers: Offer[], comments: Comment[], neighbours: Offer[], authorizationStatus: AuthorizationStatus};

function Room({offers, comments, neighbours, authorizationStatus} : RoomProps): JSX.Element {

  const [offerId, setOfferId] = useState(-1);


  const params: {id: string} = useParams();
  const id = +params.id;

  const thatOffer = offers.find((offer) => offer.id === id);

  if (!thatOffer) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  const {isPremium, price, isFavorite, title, rating, type, host, description, maxAdults, bedrooms, goods, images} = thatOffer;

  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

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

                {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm/> : null}

              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OffersList setOfferId={setOfferId} offers={neighbours}/>

            </div>
          </section>
          {/* !! удалить !! */}
          {/* Еще рано) вторую карту нарисую тогда удалю... иначе: Свойство "offerId" объявлено, но его значение не было прочитано.ts(6133)*/}
          {offerId}
        </div>
      </main>
    </div>
  );
}

export default Room;
