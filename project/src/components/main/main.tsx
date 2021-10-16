import MainFilled from '../main-filled/main-filled';
import MainEmpty from '../main-empty/main-empty';
import {Offer} from '../../types/types';


export type MainProps = {offers: Offer[], authorizationStatus: string, selectedCity: string};

function Main({offers, authorizationStatus, selectedCity}: MainProps): JSX.Element {

  const hasOffers = offers.filter((offer) => offer.city.name === selectedCity).length;

  return hasOffers ?
    <MainFilled offers={offers} authorizationStatus={authorizationStatus} selectedCity={selectedCity}/> :
    <MainEmpty authorizationStatus={authorizationStatus} selectedCity={selectedCity}/>;
}

export default Main;
