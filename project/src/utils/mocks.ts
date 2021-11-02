import { name, internet, commerce, address, datatype, image, date } from 'faker';
import { CITIES } from '../constants';
import { Comment, Offer } from '../types/types';

export const makeFakeOffer = (favorite = false): Offer => ({
  price: +commerce.price(),
  rating: datatype.float({min: 1, max: 5}),
  title: name.title(),
  type: 'Apartment',
  previewImage: image.image(),
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
  isPremium: datatype.boolean(),
  isFavorite: favorite ? true : datatype.boolean(),
  id: datatype.number(),
  maxAdults: datatype.number(6),
  bedrooms: datatype.number(6),
  description: commerce.productDescription(),
  goods: new Array(5).fill(null).map(() => commerce.productName()),
  images: new Array(5).fill(null).map(() => image.image()),
  host: {
    avatarUrl: image.image(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeOfferList = (): Offer[] => new Array(datatype.number(15)).fill(null).map(() => makeFakeOffer());
export const makeFakeFavoritesList = (): Offer[] => new Array(datatype.number(15)).fill(null).map(() => makeFakeOffer(true));


export const makeFakeComment = (): Comment => ({
  comment: commerce.productDescription(),
  date: date.past().toDateString(),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeCommentList = (): Comment[] => new Array(datatype.number(5)).fill(null).map(() => makeFakeComment());

