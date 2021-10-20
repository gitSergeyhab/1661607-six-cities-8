import { useState } from 'react';

import Header from '../header/header';
import Locations from '../locations/locations';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import SortingForm from '../sorting-form/sorting-form';
import { MainProps } from '../main/main';
import { CityCoordinate } from '../../constants';


function MainFilled({offers, authorizationStatus, selectedCity}: MainProps): JSX.Element {
  const center = CityCoordinate[selectedCity.toUpperCase()];

  const [offerId, setOfferId] = useState(-1);

  return (
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <Locations />

        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offers.length}  {offers.length > 1 ? 'places' : 'place'} to stay in {selectedCity}</b>
              <SortingForm/>

              <div className="cities__places-list places__list tabs__content">
                <OffersList setOfferId={setOfferId} offers={offers}/>
              </div>

            </section>
            <div className="cities__right-section">

              <section className="cities__map map">
                <Map center={center} offers={offers} selectedId={offerId}/>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainFilled;
