import { bindActionCreators, Dispatch } from 'redux';

import {CITIES} from '../../constants';
import { State } from '../../store/reducer';
import { changeCityAndOffers } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';
import { MouseEvent } from 'react';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';


const mapStateToProps = ({city} : State) => ({selectedCity: city});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({onClickCity: changeCityAndOffers}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Location({city, selectedCity, onClick}: {city: string, selectedCity: string, onClick: (evt: MouseEvent<HTMLAnchorElement>) => void}): JSX.Element {
  return (
    <li className="locations__item">
      <a href='/' data-city={city}  onClick={onClick} className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}

function Locations({selectedCity, onClickCity}: PropsFromRedux): JSX.Element {

  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const cityTarget = evt.currentTarget.dataset.city;
    if (cityTarget) {
      onClickCity(cityTarget);
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => <Location city={city} onClick={onClick} selectedCity={selectedCity} key={city}/>)}
      </ul>
    </section>
  );
}

export default connector(Locations);
