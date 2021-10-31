import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { MouseEvent } from 'react';

import { changeCity, changeMainOffers } from '../../store/action';
import { State } from '../../types/types';
import { CITIES } from '../../constants';
import { getCity } from '../../store/main-data/main-data-selectors';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';


const mapStateToProps = (state : State) => ({selectedCity: getCity(state)});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({changeCityName: changeCity, changeOffers: changeMainOffers}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Location({city, selectedCity, changeCityName, changeOffers} : {city: string} & PropsFromRedux): JSX.Element {
  /* eslint-disable no-console */
  console.log('Location');

  const handleCityClick = (evt: MouseEvent) => {
    evt.preventDefault();
    changeCityName(city);
    changeOffers(city);
  };

  return (
    <li className="locations__item">
      <a href='/'  onClick={handleCityClick} className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}

const LocationWithPropsFromRedux = connector(Location);


function Locations(): JSX.Element {

  const cities = CITIES.map((city) => <LocationWithPropsFromRedux city={city} key={city}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities}
      </ul>
    </section>
  );
}

export default Locations;
