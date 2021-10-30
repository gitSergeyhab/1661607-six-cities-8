import { useParams } from 'react-router';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import CommentForm from '../comment-form/comment-form';
import FavoriteBtn from '../favorite-btn/favorite-btn';
import Header from '../header/header';
import Map from '../map/map';
import NotFoundPage from '../not-found-page/not-found-page';
import ReviewList from '../review-list/review-list';
import RoomNearbyCards from '../room-nearby-cards/room-nearby-cards';
import Spinner from '../spinner/spinner';
import { fetchOfferRoomAction } from '../../store/api-actions';
import { getStarsWidth } from '../../utils/util';
import { State, ThunkAppDispatch } from '../../types/types';
import { AuthorizationStatus, FavoriteBtnProp, RoomDataStatus} from '../../constants';


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


const mapStateToProps = ({nearby, roomOffer, comments, roomDataStatus} : State) => ({neighbours: nearby, roomOffer, comments, roomDataStatus});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({loadOffer: fetchOfferRoomAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type RoomProps = {authorizationStatus: AuthorizationStatus};
type PropsFromRedux = ConnectedProps<typeof connector>

function Room({authorizationStatus, neighbours, roomOffer, comments, roomDataStatus, loadOffer} : RoomProps & PropsFromRedux): JSX.Element {
  /* eslint-disable no-console */
  console.log('Room');

  const params: {id: string} = useParams();
  const id = +params.id;


  useEffect(() => {
    loadOffer(id);
  }, [id, loadOffer]);


  if (roomDataStatus === RoomDataStatus.NotFound) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (roomDataStatus === RoomDataStatus.Loading || !roomOffer) {
    return <Spinner/>;
  }
  console.log('id: ', id, 'roomOffer.id: ', roomOffer.id);


  const {isPremium, price, isFavorite, title, rating, type, host, description, maxAdults, bedrooms, goods, images} = roomOffer;

  const center = {lat: roomOffer.location.latitude, lng: roomOffer.location.longitude};
  const offersForMap = [...neighbours, roomOffer];


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

              {isPremium && <PremiumMarker/>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                {/* <FavoriteBtn isFavorite={isFavorite} hotelId={id} btnSetting={FavoriteBtnProp.PROPERTY}/> */}
                <FavoriteBtn isFavorite={isFavorite} hotelId={roomOffer.id} btnSetting={FavoriteBtnProp.Room} nearbyRoomId={0}/>


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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

                <ReviewList hotelId={roomOffer.id}/>

                {authorizationStatus === AuthorizationStatus.Auth && <CommentForm hotelId={roomOffer.id}/>}

              </section>
            </div>
          </div>
          <section className="property__map map">

            <Map center={center} offers={offersForMap} selectedId={roomOffer.id}/>

          </section>
        </section>
        <div className="container">
          {/* <RoomNearbyCards id={id} />; */}

          <RoomNearbyCards id={roomOffer.id} nearbyRoomId={roomOffer.id} />;

        </div>
      </main>
    </div>
  );
}

export default connector(Room);
