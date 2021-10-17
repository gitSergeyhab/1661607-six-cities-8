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


type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type City = {
  location: Location
  name: string,
}

export type Offer = {
  price: number,
  rating: number,
  title: string,
  location: Location,
  city: City,
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

export type Point = {lat: number, lng: number}


export type ButtonFavorite = {className: string, width: string, height: string};
