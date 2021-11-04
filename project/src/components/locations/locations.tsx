import { useDispatch, useSelector } from 'react-redux';
import { memo, MouseEvent } from 'react';

import { changeCity, changeMainOffers } from '../../store/action';
import { getCity } from '../../store/main-data/main-data-selectors';
import { CITIES } from '../../constants';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';


function Location({city} : {city: string} ): JSX.Element {

  const selectedCity = useSelector(getCity);

  const dispatch = useDispatch();
  const changeCityName = () => dispatch(changeCity(city));
  const changeOffers = () => dispatch(changeMainOffers(city));


  const handleCityClick = (evt: MouseEvent) => {
    evt.preventDefault();
    changeCityName();
    changeOffers();
  };

  return (
    <li className="locations__item">
      <a href='/'  onClick={handleCityClick} className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}


function Locations(): JSX.Element {

  const cities = CITIES.map((city) => <Location city={city} key={city}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities}
      </ul>
    </section>
  );
}
export {Locations};
export default memo(Locations);
