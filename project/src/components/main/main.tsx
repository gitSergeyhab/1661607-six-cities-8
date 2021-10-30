import { connect } from 'react-redux';

import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import { Offer, State } from '../../types/types';
import { AuthorizationStatus } from '../../constants';


const mapStateToProps = ({MainData: {city, offers}}: State) => ({selectedCity: city, offers});

export type MainProps = {offers: Offer[], authorizationStatus: AuthorizationStatus, selectedCity: string};


function Main({offers, authorizationStatus, selectedCity}: MainProps): JSX.Element {

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity);

  return selectedCityOffers.length ?
    <MainFilled offers={selectedCityOffers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default connect(mapStateToProps)(Main);
