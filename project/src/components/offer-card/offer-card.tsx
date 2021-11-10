import { Link } from 'react-router-dom';

import FavoriteBtn from '../favorite-btn/favorite-btn';
import { Offer } from '../../types/types';
import { getStarsWidth } from '../../utils/util';
import { BtnType, RoomDataStatus } from '../../constants';
import { useDispatch } from 'react-redux';
import { changeRoomDataStatus } from '../../store/action';


const OFFER_PATH = '/offer/';

type OfferCardProps = {offer: Offer, btnType: BtnType, infoClass: string, wrapperClass: string, imgWidth: string, imgHeight: string};

function Premium() {
  return <div className="place-card__mark"><span>Premium</span></div>;
}

function OfferCard({offer, btnType, ...restProps}: OfferCardProps): JSX.Element {
  const {isPremium, price, isFavorite, title, previewImage, rating, type, id} = offer;
  const {infoClass, wrapperClass, imgHeight, imgWidth} = restProps;

  const dispatch = useDispatch();

  const handleLinkClick = () => dispatch(changeRoomDataStatus(RoomDataStatus.Loading));

  return (
    <>
      {isPremium && <Premium/>}

      <div className={`${wrapperClass} place-card__image-wrapper`}>
        <Link to={`${OFFER_PATH}${id}`} onClick={handleLinkClick}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place"/>
        </Link>
      </div>

      <div className={`${infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteBtn isFavorite={isFavorite} hotelId={id} btnType={btnType}/>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">

            <span style={{width: getStarsWidth(rating)}}></span>

            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${OFFER_PATH}${id}`} onClick={handleLinkClick}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </>
  );
}

export default OfferCard;
