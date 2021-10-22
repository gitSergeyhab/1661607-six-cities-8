import { connect } from 'react-redux';

import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import { Offer } from '../../types/types';
import { State } from '../../types/types';
import Spinner from '../spinner/spinner';
import { AuthorizationStatus } from '../../constants';


const mapStateToProps = ({city, offers, isHotelsLoaded}: State) => ({selectedCity: city, offers, isHotelsLoaded});

export type MainProps = {offers: Offer[], authorizationStatus: AuthorizationStatus, selectedCity: string};


function Main({offers, authorizationStatus, selectedCity, isHotelsLoaded}: MainProps & {isHotelsLoaded: boolean}): JSX.Element {

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity);

  if (!isHotelsLoaded) {
    return <Spinner authorizationStatus={authorizationStatus}/>;
  }

  return selectedCityOffers.length ?
    <MainFilled offers={selectedCityOffers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default connect(mapStateToProps)(Main);
