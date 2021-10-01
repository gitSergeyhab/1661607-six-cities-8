import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import Property from './components/property/property';
// import Favorites from './components/favorites/favorites';
// import FavoritesEmpty from './components/favorites-empty/favorites-empty';
// import Login from './components/login/login';
// import MainEmpty from './components/main-empty/main-empty';
// import Footer from './components/footer/footer';


const offers = [
  {
    price: 120,
    rating: 3.4,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    previewImage: 'img/apartment-01.jpg',
    city: {name: 'Amsterdam'},
    isPremium: true,
    isFavorite: false,
    id: 1,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },
  {
    price: 80,
    rating: 3.7,
    title: 'Wood and stone place',
    type: 'Private room',
    previewImage: 'img/room.jpg',
    city: {name: 'Amsterdam'},
    isPremium: false,
    isFavorite: false,
    id: 2,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },
  {
    price: 132,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
    city: {name: 'Amsterdam'},
    isPremium: false,
    isFavorite: true,
    id: 3,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },
  {
    price: 180,
    rating: 4.3,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: 'img/apartment-03.jpg',
    city: {name: 'Amsterdam'},
    isPremium: true,
    isFavorite: false,
    id: 4,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },
  {
    price: 80,
    rating: 4.7,
    title: 'Wood and stone place',
    type: 'Private room',
    previewImage: 'img/room.jpg',
    city: {name: 'Amsterdam'},
    isPremium: false,
    isFavorite: true,
    id: 5,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },

  {
    price: 180,
    rating: 4.7,
    title: 'White castle',
    type: 'Apartment',
    previewImage: 'img/room.jpg',
    city: {name: 'Cologne'},
    isPremium: false,
    isFavorite: true,
    id: 6,
    maxAdults: 4,
    bedrooms: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
  },
];


const comments = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 4,
      isPro: true,
      name: 'Angelina',
    },
  },

  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-09-09T14:13:56.569Z',
    id: 2,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 7,
      isPro: false,
      name: 'Max',
    },
  },
];


ReactDOM.render(
  <React.StrictMode>
    <App
      offers = {offers}
    />
    {/* <MainEmpty/> */}
    <Property offer={offers[0]} comments={comments} neighbourhoods={offers.slice(1,4)}/>
    {/* <Favorites
      offers = {offers.filter((offer) => offer.isFavorite)}
    /> */}
    {/* <FavoritesEmpty/> */}
    {/* <Login/>  */}
    {/* <Footer/> */}
  </React.StrictMode>,
  document.getElementById('root'));
