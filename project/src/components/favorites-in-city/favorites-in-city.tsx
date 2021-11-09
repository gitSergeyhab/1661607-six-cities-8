import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FavoriteCard from '../favorite-card/favorite-card';
import { changeCity, changeMainOffers } from '../../store/action';
import { Offer } from '../../types/types';
import { AppRoute } from '../../constants';


function FavoritesInCity({offers, city} : {offers: Offer[], city: string}):JSX.Element {

  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const mapOffers = cityOffers.map((offer) => <FavoriteCard offer={offer} key={offer.id}/>);

  const dispatch = useDispatch();

  const handleCityClick = () => {
    dispatch(changeCity(city));
    dispatch(changeMainOffers(city));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">

          <Link className="locations__item-link" onClick={handleCityClick} to={AppRoute.Main} data-testid='city-link'>
            <span>{city}</span>
          </Link>

        </div>
      </div>
      <div className="favorites__places">

        {mapOffers}

      </div>
    </li>
  );
}

export default FavoritesInCity;
