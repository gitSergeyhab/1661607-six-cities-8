import { RATING_COEFFICIENT } from '../constants';
import { Offer } from '../types/types';


const getOffersByCity = (offers: Offer[], city: string): Offer[] => offers.filter((offer) => offer.city.name === city);

const getStarsWidth = (rating: number): string => `${Math.round(rating) * RATING_COEFFICIENT}%`;


export {
  getStarsWidth,
  getOffersByCity
};
