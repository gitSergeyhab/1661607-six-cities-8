import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../constants';


function HeaderLogo(): JSX.Element {
  return (
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
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
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
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
  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="/">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </a>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="/">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Header({status}: {status?: string}): JSX.Element {

  let logInOutBlock = status === AuthorizationStatus.Auth ? <AuthHeader/> : <NotAuthHeader/>;
  logInOutBlock = window.location.pathname === AppRoute.Login ? <span></span> : logInOutBlock;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          {logInOutBlock}
        </div>
      </div>
    </header>
  );
}

export default Header;
