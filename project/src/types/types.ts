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


export type ButtonFavorite = {className: string, width: string, height: string};
