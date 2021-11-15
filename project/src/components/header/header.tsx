import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { memo, MouseEvent } from 'react';

import { getUserEmail, getAvatar } from '../../services/user-info';
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

  const handleSignOutClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };


  const userEmail = getUserEmail();
  const avatar = getAvatar();

  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} data-testid="favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img src={avatar} alt="" style={{borderRadius: '50%'}}/>
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a href='/' className="header__nav-link" onClick={handleSignOutClick} data-testid="sign-out">
            <span className="header__signout">Sign out</span>
          </a>
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
