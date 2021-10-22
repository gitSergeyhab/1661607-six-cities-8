import { AuthorizationStatus } from '../../constants';
import Header from '../header/header';
import Locations from '../locations/locations';

function Spinner({authorizationStatus}: {authorizationStatus: AuthorizationStatus}): JSX.Element {


  return (
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <Locations />

        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <h2 style={{margin: 'auto'}}>Loading... .. .</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Spinner;
