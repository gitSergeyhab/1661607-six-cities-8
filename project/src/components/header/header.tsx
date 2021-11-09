import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { memo } from 'react';

import { getUserEmail } from '../../services/user-email';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../constants';


function HeaderLogo(): JSX.Element {
  return (
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main} data-testid="logo">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}


function NotAuthHeader(): JSX.Element {
  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login} data-testid="sign-in">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


function AuthHeader(): JSX.Element {

  const dispatch = useDispatch();
  const handleSignOutClick = () => dispatch(logoutAction());

  const userEmail = getUserEmail();

  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} data-testid="favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" onClick={handleSignOutClick} to={AppRoute.Login} data-testid="sign-out">
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


function Header({authorizationStatus}: {authorizationStatus: AuthorizationStatus}): JSX.Element {

  let authComponent = authorizationStatus === AuthorizationStatus.Auth ? <AuthHeader/> : <NotAuthHeader/>;
  authComponent = window.location.pathname === AppRoute.Login ? <span></span> : authComponent;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          {authComponent}
        </div>
      </div>
    </header>
  );
}

export default memo(Header, (prev, next) => prev.authorizationStatus === next.authorizationStatus);
