import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteBtn from '../favorite-btn/favorite-btn';
import Header from '../header/header';
import Map from '../map/map';
import NotFoundPage from '../not-found-page/not-found-page';
import RoomNearbyCards from '../room-nearby-cards/room-nearby-cards';
import RoomCommentSection from '../room-comment-section/room-comment-section';
import Spinner from '../spinner/spinner';
import { fetchOfferRoomAction } from '../../store/api-actions';
import { getStarsWidth } from '../../utils/util';
import { getNearby, getRoomDataStatus, getRoomOffer } from '../../store/room-data/room-data-selectors';
import { AuthorizationStatus, BtnType, RoomDataStatus } from '../../constants';
import { getRoomErrorStatus } from '../../store/error-status/error-status-selectors';


const MAX_IMAGES_NUMBER = 6;

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


function Room({authorizationStatus} : {authorizationStatus: AuthorizationStatus}): JSX.Element {

  const params: {id: string} = useParams();
  const id = +params.id;

  const neighbours = useSelector(getNearby);
  const roomOffer = useSelector(getRoomOffer);
  const roomDataStatus = useSelector(getRoomDataStatus);
  const error = useSelector(getRoomErrorStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOfferRoomAction(id));
  }, [id, dispatch]);


  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus} />;
  }

  if (roomDataStatus === RoomDataStatus.Loading || !roomOffer) {
    return <Spinner/>;
  }


  const {isPremium, price, isFavorite, title, rating, type, host, description, maxAdults, bedrooms, goods, images} = roomOffer;

  const center = {lat: roomOffer.location.latitude, lng: roomOffer.location.longitude};
  const offersForMap = [...neighbours, roomOffer];

  const imageList = images.slice(0, MAX_IMAGES_NUMBER).map((image) => <ApartmentPicture src={image} key={image}/>);
  const goodList = goods.map((good) => <Good goodName={good} key={good}/>);


  return (
    <div className="page">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {imageList}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium && <PremiumMarker/>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                <FavoriteBtn isFavorite={isFavorite} hotelId={id}  btnType={BtnType.Room}/>

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
                  {goodList}
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

              <RoomCommentSection id={id} authorizationStatus={authorizationStatus} />

            </div>
          </div>
          <section className="property__map map">

            <Map center={center} offers={offersForMap} selectedId={id}/>

          </section>
        </section>
        <div className="container">

          <RoomNearbyCards id={id} />;

        </div>
      </main>
    </div>
  );
}

export default Room;
