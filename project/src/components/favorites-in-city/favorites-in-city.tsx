import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import FavoriteCard from '../favorite-card/favorite-card';
import { changeCity, changeMainOffers } from '../../store/action';
import { Offer } from '../../types/types';
import { AppRoute } from '../../constants';


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({changeCityName: changeCity, changeOffers: changeMainOffers}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function FavoritesInCity({offers, city, changeCityName, changeOffers} : {offers: Offer[], city: string} & PropsFromRedux):JSX.Element {
  /* eslint-disable no-console */
  console.log('FavoritesInCity');
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const mapOffers = cityOffers.map((offer) => <FavoriteCard offer={offer} key={offer.id}/>);

  const handleCityClick = () => {
    changeCityName(city);
    changeOffers(city);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">

          <Link className="locations__item-link" onClick={handleCityClick} to={AppRoute.Main}>
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

export default connector(FavoritesInCity);
