import Header from '../header/header';
import Locations from '../locations/locations';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

import {MainProps} from '../main/main';
import { useState } from 'react';


const center = {lat: 52.3809553943508, lng: 4.939309666406198};


function MainFilled({offers, authorizationStatus, selectedCity}: MainProps): JSX.Element {

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity);

  const [offerId, setOfferId] = useState(-1);

  return (
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <Locations selectedCity={selectedCity}/>

        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity}</b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <div className="cities__places-list places__list tabs__content">
                <OffersList setOfferId={setOfferId} offers={selectedCityOffers}/>
              </div>

            </section>
            <div className="cities__right-section">

              <section className="cities__map map">
                <Map center={center} offers={selectedCityOffers} selectedId={offerId}/>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainFilled;
