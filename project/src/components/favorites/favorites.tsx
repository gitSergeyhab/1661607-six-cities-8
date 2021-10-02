import FavoriteCard from '../favorite-card/favorite-card';
import Header from '../header/header';

import {Offer} from '../../types/types';


function Favorites({offers}: {offers: Offer[]}): JSX.Element {
  return (
    <div className="page">

      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">

                  {offers.filter((offer) => offer.city.name === 'Amsterdam').map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}

                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">

                  {offers.filter((offer) => offer.city.name === 'Cologne').map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}

                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export  default Favorites;
