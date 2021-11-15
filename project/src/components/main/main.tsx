import { useSelector } from 'react-redux';

import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import { AuthorizationStatus } from '../../constants';
import { getCity, getCityOffers, getHotelsLoadedStatus } from '../../store/main-data/main-data-selectors';
import { getMainErrorStatus } from '../../store/error-status/error-status-selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';


function Main({authorizationStatus}: {authorizationStatus: AuthorizationStatus}): JSX.Element {

  const selectedCity = useSelector(getCity);
  const offers = useSelector(getCityOffers);
  const error = useSelector(getMainErrorStatus);
  const areHotelsLoaded = useSelector(getHotelsLoadedStatus);

  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!areHotelsLoaded) {
    return <Spinner/>;
  }

  return offers.length ?
    <MainFilled offers={offers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default Main;
