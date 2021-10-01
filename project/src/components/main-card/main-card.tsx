import FavoriteBtn from '../favorite-btn/favorite-btn';

import {Offer, FavoriteBtnProp} from '../../constants';
import {getStarsWidth} from '../../util';


function Premium() {
  return <div className="place-card__mark"><span>Premium</span></div>;
}

function MainCard({offer: {isPremium, price, isFavorite, title, previewImage, rating, type}}: {offer: Offer}): JSX.Element {
  return (
    <article className="cities__place-card place-card">

      {isPremium ? <Premium/> : null}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </a>
      </div>
      <div className="place-card__info">
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
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default MainCard;

