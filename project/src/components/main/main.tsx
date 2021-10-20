import { connect } from 'react-redux';

import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import { Offer } from '../../types/types';
import { State } from '../../store/reducer';


const mapStateToProps = ({city, offers}: State) => ({selectedCity: city, offers});

export type MainProps = {offers: Offer[], authorizationStatus: string, selectedCity: string};


function Main({offers, authorizationStatus, selectedCity}: MainProps): JSX.Element {

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity);

  return selectedCityOffers.length ?
    <MainFilled offers={selectedCityOffers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default connect(mapStateToProps)(Main);
