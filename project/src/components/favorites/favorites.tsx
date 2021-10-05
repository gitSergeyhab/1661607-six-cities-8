import {Link} from 'react-router-dom';

import FavoriteCard from '../favorite-card/favorite-card';
import Header from '../header/header';

import {Offer} from '../../types/types';
import {AppRoute, AuthorizationStatus} from '../../constants';


function Favorites({offers, authorizationStatus}: {offers: Offer[], authorizationStatus: string}): JSX.Element {
  return (
    <div className="page">

      <Header authorizationStatus={AuthorizationStatus.Auth}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">

                  {offers.filter((offer) => offer.city.name === 'Amsterdam').map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}

                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>Cologne</span>
                    </Link>
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
