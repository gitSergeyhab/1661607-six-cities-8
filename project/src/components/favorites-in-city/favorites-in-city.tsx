import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import FavoriteCard from '../favorite-card/favorite-card';
import { changeCity, getOffers } from '../../store/action';

import { Offer } from '../../types/types';
import { AppRoute } from '../../constants';


// import {Actions} from '../../store/action'; // ??? с Actions почему-то не работает ???
// const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({onCityClick: changeCityAndOffers}, dispatch);


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({changeCityClick: changeCity, getOffersClick: getOffers}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function FavoritesInCity({offers, city, changeCityClick, getOffersClick} : {offers: Offer[], city: string} & PropsFromRedux):JSX.Element {

  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const mapOffers = cityOffers.map((offer) => <FavoriteCard offer={offer} key={offer.id}/>);

  const onClick = () => {
    changeCityClick(city);
    getOffersClick(city);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">

          <Link className="locations__item-link" onClick={onClick} to={AppRoute.Main}>
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
