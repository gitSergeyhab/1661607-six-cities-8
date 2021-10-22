import { bindActionCreators, Dispatch } from 'redux';

import {CITIES} from '../../constants';
import { State } from '../../store/reducer';
import { changeCity, getOffers } from '../../store/action';

import { connect, ConnectedProps } from 'react-redux';
import { MouseEvent } from 'react';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';


const mapStateToProps = ({city} : State) => ({selectedCity: city});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({changeCityClick: changeCity, getOffersClick: getOffers}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Location({city, selectedCity, changeCityClick, getOffersClick} : {city: string} & PropsFromRedux): JSX.Element {

  const onClick = (evt: MouseEvent) => {
    evt.preventDefault();
    changeCityClick(city);
    getOffersClick(city);
  };

  return (
    <li className="locations__item">
      <a href='/'  onClick={onClick} className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`}>
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
