import {Link} from 'react-router-dom';

import FavoriteBtn from '../favorite-btn/favorite-btn';

import {Offer} from '../../types/types';
import {FavoriteBtnProp, AppRoute} from '../../constants';
import {getStarsWidth} from '../../util';


function FavoriteCard({offer: {price, isFavorite, title, previewImage, rating, type}}: {offer: Offer}): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Room}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
          <Link to={AppRoute.Room}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
