import {Link} from 'react-router-dom';
import Header from '../header/header';
import {AppRoute, AuthorizationStatus, CITIES} from '../../constants';
import { bindActionCreators, Dispatch } from 'redux';
import { changeCity, getOffers } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import { State } from '../../types/types';
import LoginForm from '../login-form/login-form';


const mapStateToProps = ({authorizationStatus} : State) => ({authorizationStatus});
const mapDispatchToProps = (dispatch: Dispatch ) => bindActionCreators({changeCityClick: changeCity, getOffersClick: getOffers}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function Login({changeCityClick, getOffersClick, authorizationStatus} : PropsFromRedux): JSX.Element {

  const randomCity = CITIES[Math.floor(Math.random()*CITIES.length)];

  const onRandomCityClick = () => {
    changeCityClick(randomCity);
    getOffersClick(randomCity);
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Main}/>;
  }

  return (
    <div className="page page--gray page--login">

      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={onRandomCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default connector(Login);
