import {cities} from '../../constants';


function Location({city}: {city: string}): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href={`/${city}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}

function Locations(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">

        {cities.map((city) => <Location city={city} key={city}/>)}

      </ul>
    </section>
  );
}

export default Locations;
