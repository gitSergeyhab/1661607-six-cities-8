import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';


const INFO_CLASS = '';
const WRAPPER_CLASS = 'cities__image-wrapper';
const [IMG_WIDTH, IMG_HIGHT] = ['260', '200'];

const offerCardProps = {infoClass: INFO_CLASS, wrapperClass: WRAPPER_CLASS, imgWidth: IMG_WIDTH, imgHeight: IMG_HIGHT};

type RoomCardProps = {nearbyRoomId: number, offer: Offer};

function RoomCard({offer, nearbyRoomId} : RoomCardProps): JSX.Element {

  return (
    <article className="cities__place-card place-card">
      <OfferCard offer={offer} {...offerCardProps} nearbyRoomId={nearbyRoomId}/>
    </article>
  );
}

export default RoomCard;
