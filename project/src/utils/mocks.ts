import { name, internet, commerce, address, datatype, image, date } from 'faker';
import { CITIES } from '../constants';
import { adaptCommentFromServer, adaptHotelFromServer } from '../services/adapters';
import { Comment, Offer, ServerComment, ServerOffer } from '../types/types';


export const makeFakeServerOffer = (favorite = false): ServerOffer => ({
  price: +commerce.price(),
  rating: datatype.float({min: 1, max: 5}),
  title: name.title(),
  type: 'Apartment',
  'preview_image': image.image(),
  city: {
    location: {
      latitude: parseFloat(address.latitude()),
      longitude: parseFloat(address.longitude()),
      zoom: 10},
    name: CITIES[datatype.number(5)],
  },
  location: {
    latitude: parseFloat(address.latitude()),
    longitude: parseFloat(address.longitude()),
    zoom: 10,
  },
  'is_premium': datatype.boolean(),
  'is_favorite': favorite ? true : datatype.boolean(),
  id: datatype.number(),
  'max_adults': datatype.number(6),
  bedrooms: datatype.number(6),
  description: commerce.productDescription(),
  goods: new Array(5).fill(null).map(() => commerce.productName()),
  images: new Array(5).fill(null).map(() => image.image()),
  host: {
    'avatar_url': '',
    id: datatype.number(),
    'is_pro': datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeServerOfferList = (): ServerOffer[] => new Array(5).fill(null).map(() => makeFakeServerOffer());
export const makeFakeServerFavoritesList = (): ServerOffer[] => new Array(5).fill(null).map(() => makeFakeServerOffer(true));

export const makeFakeOffer = (favorite = false): Offer => adaptHotelFromServer(makeFakeServerOffer(favorite));
export const makeFakeOfferList = (): Offer[] => new Array(5).fill(null).map(() => makeFakeOffer());
export const makeFakeFavoritesList = (): Offer[] => new Array(5).fill(null).map(() => makeFakeOffer(true));


export const makeFakeServerComment = (): ServerComment => ({
  comment: commerce.productDescription(),
  date: date.past().toDateString(),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    'avatar_url': internet.avatar(),
    id: datatype.number(),
    'is_pro': datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeServerCommentList = (): ServerComment[] => new Array(datatype.number(5)).fill(null).map(() => makeFakeServerComment());


export const makeFakeComment = (): Comment => adaptCommentFromServer(makeFakeServerComment());
export const makeFakeCommentList = (): Comment[] => new Array(5).fill(null).map(() => makeFakeComment());

export const fakeServerHotels = makeFakeServerOfferList();
export const fakeHotels = fakeServerHotels.map((hotel) => adaptHotelFromServer(hotel));
