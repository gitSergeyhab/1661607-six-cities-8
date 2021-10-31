import { useParams } from 'react-router';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import FavoriteBtn from '../favorite-btn/favorite-btn';
import Header from '../header/header';
import Map from '../map/map';
import NotFoundPage from '../not-found-page/not-found-page';
import RoomNearbyCards from '../room-nearby-cards/room-nearby-cards';
import Spinner from '../spinner/spinner';
import { fetchOfferRoomAction } from '../../store/api-actions';
import { getStarsWidth } from '../../utils/util';
import { State, ThunkAppDispatch } from '../../types/types';
import { AuthorizationStatus, FavoriteBtnProp, RoomDataStatus} from '../../constants';
import RoomCommentSection from '../room-comment-section/room-comment-section';


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


const mapStateToProps = ({RoomData: {nearby, roomOffer, roomDataStatus}} : State) => ({neighbours: nearby, roomOffer, roomDataStatus});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({loadOffer: fetchOfferRoomAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type RoomProps = {authorizationStatus: AuthorizationStatus};
type PropsFromRedux = ConnectedProps<typeof connector>

function Room({authorizationStatus, neighbours, roomOffer, roomDataStatus, loadOffer} : RoomProps & PropsFromRedux): JSX.Element {
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

                <FavoriteBtn isFavorite={isFavorite} hotelId={id} btnSetting={FavoriteBtnProp.Room} />

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

export default connector(Room);
