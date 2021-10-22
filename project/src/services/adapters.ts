// import {City, Host} from '../types/types';
import {Offer, Comment} from '../types/types';


// export type ServerOffer = {
//   bedrooms: number,
//   city: City,
//   description: string,
//   goods: string[],
//   host: Host,
//   id: number,
//   images: string[],
//   'is_favorite': boolean,
//   'is_premium': boolean,
//   location: Location,
//   'max_adults': number,
//   'preview_image': string,
//   price: number,
//   rating: number,
//   title: string,
//   type: string,
// }

// type ServerUser = {
//   avatarUrl: string,
//   id: number,
//   'is_pro': boolean,
//   name: string,
// }

// export type ServerComment = {
//   comment: string,
//   date: string,
//   id: number,
//   rating: number,
//   user: ServerUser,
// }

export const adaptHotelFromServer = (serverHotel: any): Offer => { // если назначать конкретый тип...
  const offer = {
    ...serverHotel,
    isFavorite: serverHotel['is_favorite'],
    isPremium: serverHotel['is_premium'],
    maxAdults: serverHotel['max_adults'],
    previewImage: serverHotel['preview_image'],
  };

  delete offer['is_favorite']; // ...будет выдавать ошибку при удалении и требовать, чтоб свойство в объекте было опциональным
  delete offer['is_premium'];
  delete offer['max_adults'];
  delete offer['preview_image'];

  return offer;
};

export const adaptCommentFromServer = (serverComment: any): Comment => {
  const comment = {
    ...serverComment,
    user: {isPro: serverComment.user['is_pro']},
  };

  delete serverComment.user['is_pro'];

  return comment;
};
