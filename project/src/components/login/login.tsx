import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../header/header';
import LoginForm from '../login-form/login-form';
import { changeCity, changeMainOffers } from '../../store/action';
import { getAuthorizationStatus } from '../../store/user-data/user-data-selectors';
import { AppRoute, AuthorizationStatus, CITIES } from '../../constants';


function Login(): JSX.Element {

  const randomCity = CITIES[Math.floor(Math.random()*CITIES.length)];

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const changeCityName = () => dispatch(changeCity(randomCity)) ;
  const changeOffers = () => dispatch(changeMainOffers(randomCity));


  const handleRandomCityClick = () => {
    changeCityName();
    changeOffers();
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Main}/>;
  }

  return (
    <div className="page page--gray page--login">

      <Header authorizationStatus={authorizationStatus}/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link data-testid='random-city-link' className="locations__item-link" to={AppRoute.Main} onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
