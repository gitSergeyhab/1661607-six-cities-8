import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent } from 'react';

import { changeCity, changeMainOffers } from '../../store/action';
import { getCity } from '../../store/main-data/main-data-selectors';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';


function Location({city} : {city: string} ): JSX.Element {

  const selectedCity = useSelector(getCity);

  const dispatch = useDispatch();

  const handleCityClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(changeCity(city));
    dispatch(changeMainOffers(city));
  };

  return (
    <li className="locations__item">
      <a href='/'  onClick={handleCityClick} className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}


export default Location;
