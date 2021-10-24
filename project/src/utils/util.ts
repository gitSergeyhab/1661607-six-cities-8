import { RATING_COEFFICIENT, SortOption } from '../constants';
import { Offer } from '../types/types';

const ReviewLength = {
  MAX: 300,
  MIN: 50,
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

const disableReviewSubmit = (star: string, text: string): boolean => {
  const length = text.length;
  return !(star && length <= ReviewLength.MAX && length >= ReviewLength.MIN);
};

const checkPassword = (password: string | undefined | null): boolean =>
  password !== null && password !== undefined && /\d/.test(password) && /[a-zа-я]/i.test(password);

const checkEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const disableSignInSubmit = (email: string, password: string): boolean => !checkEmail(email) || !checkPassword(password);

export {
  getStarsWidth,
  getOffersByCity,
  getSortedOffers,
  disableReviewSubmit,
  checkPassword,
  checkEmail,
  disableSignInSubmit
};
