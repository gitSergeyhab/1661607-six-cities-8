import FavoritesInCity from '../favorites-in-city/favorites-in-city';
import Footer from '../footer/footer';
import Header from '../header/header';

import { Offer } from '../../types/types';
import { AuthorizationStatus } from '../../constants';


function FavoritesFilled({offers}: {offers: Offer[]}): JSX.Element {
  /* eslint-disable no-console */
  console.log('FavoritesFilled');
  const cities = [...new Set (offers.map((offer) => offer.city.name))];
  const citiesWithOffers = cities.map((city) => <FavoritesInCity offers={offers} city={city} key={city}/>);

  return (
    <div className="page">

      <Header authorizationStatus={AuthorizationStatus.Auth}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {citiesWithOffers}

            </ul>
          </section>
        </div>
      </main>

      <Footer/>

    </div>
  );
}

export default FavoritesFilled;
