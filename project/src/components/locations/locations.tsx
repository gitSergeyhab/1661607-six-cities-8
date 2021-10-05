import {Link} from 'react-router-dom';
import {CITIES, AppRoute} from '../../constants';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';

function Location({city, selectedCity}: {city: string, selectedCity: string}): JSX.Element {
  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${city === selectedCity ? ACTIVE_CITY_CLASS : ''}`} to={AppRoute.Main}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

function Locations(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => <Location city={city} selectedCity={CITIES[3]} key={city}/>)}
      </ul>
    </section>
  );
}

export default Locations;
