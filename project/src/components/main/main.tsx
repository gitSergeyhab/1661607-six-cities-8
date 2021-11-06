import { useSelector } from 'react-redux';

import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import { AuthorizationStatus } from '../../constants';
import { getCity, getCityOffers } from '../../store/main-data/main-data-selectors';


function Main({authorizationStatus}: {authorizationStatus: AuthorizationStatus}): JSX.Element {

  const selectedCity = useSelector(getCity);
  const offers = useSelector(getCityOffers);

  return offers.length ?
    <MainFilled offers={offers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default Main;
