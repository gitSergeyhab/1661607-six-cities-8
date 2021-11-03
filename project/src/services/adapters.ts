import { Offer, Comment, ServerOffer, ServerComment } from '../types/types';


export const adaptHotelFromServer = (serverHotel: ServerOffer): Offer => {
  const offer = {
    ...serverHotel,
    isFavorite: serverHotel['is_favorite'],
    isPremium: serverHotel['is_premium'],
    maxAdults: serverHotel['max_adults'],
    previewImage: serverHotel['preview_image'],
    host: {
      ...serverHotel.host,
      avatarUrl: serverHotel.host['avatar_url'],
      isPro: serverHotel.host['is_pro'],
    },
  };

  delete offer['is_favorite'];
  delete offer['is_premium'];
  delete offer['max_adults'];
  delete offer['preview_image'];
  delete offer.host['is_pro'];
  delete offer.host['avatar_url'];

  return offer as Offer;
};

export const adaptCommentFromServer = (serverComment: ServerComment): Comment => {
  const comment = {
    ...serverComment,
    user: {
      ...serverComment.user,
      isPro: serverComment.user['is_pro'],
      avatarUrl: serverComment.user['avatar_url'],
    },
  };

  delete comment.user['is_pro'];
  delete comment.user['avatar_url'];

  return comment as Comment;
};
