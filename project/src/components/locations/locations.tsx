import { memo } from 'react';

import Location from '../location/location';
import { CITIES } from '../../constants';


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

export default memo(Locations);
