import { Offer } from '../types/types';
import { RATING_COEFFICIENT, SortOption } from '../constants';


const ReviewLength = {
  MIN: 50,
  MAX: 300,
};

const Re = {
  NUMBER: /\d/,
  LETTER: /[a-zа-я]/i,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};


const getOffersByCity = (offers: Offer[], city: string): Offer[] => offers.filter((offer) => offer.city.name === city);

const getStarsWidth = (rating: number): string => `${Math.round(rating) * RATING_COEFFICIENT}%`;

const sortHighPrice = (offers: Offer[]) => ([...offers].sort((a, b) => b.price - a.price));
const sortLowPrice = (offers: Offer[]) => ([...offers].sort((a, b) => a.price - b.price));
const sortHighRated = (offers: Offer[]) => ([...offers].sort((a, b) => b.rating - a.rating));

const getSortedOffers = (offers: Offer[], option: string): Offer[] => {
  switch (option) {
    case SortOption.PriceHightToLow:
      return sortHighPrice(offers);
    case SortOption.PriceLowToHight:
      return sortLowPrice(offers);
    case SortOption.TopRated:
      return sortHighRated(offers);
    default:
      return [...offers];
  }
};
const disableByStarAndLength = (star: number, text: string): boolean => {
  const length = text.length;
  return !(star && length <= ReviewLength.MAX && length >= ReviewLength.MIN);
};

const checkPassword = (password: string | undefined | null): boolean =>
  password !== null && password !== undefined && Re.NUMBER.test(password) && Re.LETTER.test(password);

const checkEmail = (email: string): boolean => Re.EMAIL.test(String(email).toLowerCase());

const disableSignInSubmit = (email: string, password: string): boolean => !checkEmail(email) || !checkPassword(password);

export {
  getStarsWidth,
  getOffersByCity,
  getSortedOffers,
  disableByStarAndLength,
  checkPassword,
  checkEmail,
  disableSignInSubmit
};
