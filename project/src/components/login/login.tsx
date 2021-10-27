import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';

import Header from '../header/header';
import LoginForm from '../login-form/login-form';
import { changeCity, changeMainOffers } from '../../store/action';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus, CITIES } from '../../constants';


const mapStateToProps = ({authorizationStatus} : State) => ({authorizationStatus});
const mapDispatchToProps = (dispatch: Dispatch ) => bindActionCreators({changeCityName: changeCity, changeOffers: changeMainOffers}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function Login({changeCityName, changeOffers, authorizationStatus} : PropsFromRedux): JSX.Element {

  const randomCity = CITIES[Math.floor(Math.random()*CITIES.length)];

  const handleRandomCityClick = () => {
    changeCityName(randomCity);
    changeOffers(randomCity);
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
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleRandomCityClick}>
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
