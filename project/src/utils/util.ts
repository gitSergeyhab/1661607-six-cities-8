import {RATING_COEFFICIENT} from '../constants';

const getStarsWidth = (rating: number): string => `${Math.round(rating) * RATING_COEFFICIENT}%`;

export {getStarsWidth};
