import {Link} from 'react-router-dom';

import FavoriteBtn from '../favorite-btn/favorite-btn';

import {Offer} from '../../types/types';
import {FavoriteBtnProp, TypeOfferCard} from '../../constants';
import {getStarsWidth} from '../../utils/util';
/* eslint-disable no-console */

const OFFER_PATH = '/offer/';


function Premium() {
  return <div className="place-card__mark"><span>Premium</span></div>;
}

function OfferCard({offer: {isPremium, price, isFavorite, title, previewImage, rating, type, id}, typeCard}: {offer: Offer,typeCard: string,}): JSX.Element {

  const infoClass = typeCard === TypeOfferCard.Main ? '' : 'favorites__card-info';
  const wrapperClass = typeCard === TypeOfferCard.Main ? 'cities__image-wrapper' : 'favorites__image-wrapper';
  const [width, height] = typeCard === TypeOfferCard.Main ? ['260', '200'] : ['150', '110'];

  return (
    <>
      {isPremium ? <Premium/> : null}

      <div className={`${wrapperClass} place-card__image-wrapper`}>
        <Link to={`${OFFER_PATH}${id}`}>
          <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place"/>
        </Link>
      </div>

      <div className={`${infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteBtn isFavorite={isFavorite} btn={FavoriteBtnProp.CARD}/>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">

            <span style={{width: getStarsWidth(rating)}}></span>

            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${OFFER_PATH}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </>
  );
}

export default OfferCard;

