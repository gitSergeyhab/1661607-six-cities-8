const RATING_COEFFICIENT = 20;

const FavoriteBtnProp = {
  CARD: {className: 'place-card', width: '18', height: '19'},
  PROPERTY: {className: 'property', width: '31', height: '33'},
};

const STARS = [
  {count: '5', titleName: 'perfect'},
  {count: '4', titleName: 'good'},
  {count: '3', titleName: 'not bad'},
  {count: '2', titleName: 'badly'},
  {count: '1', titleName: 'terribly'},
];

type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Offer = {
  price: number,
  rating: number,
  title: string,
  city: {name: string}, // поменять
  type: string,
  previewImage: string,
  isPremium: boolean,
  isFavorite: boolean,
  id: number,
  maxAdults: number,
  bedrooms: number,
  description: string,
  goods: string[],
  images: string[],
  host: Host,
}

export type OfferList = {offers: Offer[];}

export type ButtonFavorite = {className: string, width: string, height: string}

export {
  RATING_COEFFICIENT,
  FavoriteBtnProp,
  STARS
};
