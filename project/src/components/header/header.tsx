import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserEmail } from '../../services/user-email';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/types';
import { AuthorizationStatus, AppRoute } from '../../constants';


function HeaderLogo(): JSX.Element {
  /* eslint-disable no-console */
  console.log('HeaderLogo');
  return (
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}


function NotAuthHeader(): JSX.Element {
  /* eslint-disable no-console */
  console.log('NotAuthHeader');
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


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({handleSignOutClick: logoutAction}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthHeader({handleSignOutClick}: PropsFromRedux): JSX.Element {
  /* eslint-disable no-console */
  console.log('AuthHeader');

  const userEmail = getUserEmail();

  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" onClick={handleSignOutClick} to={AppRoute.Login}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const AuthHeaderWithReduxProps = connector(AuthHeader);


function Header({authorizationStatus}: {authorizationStatus?: string}): JSX.Element {
  /* eslint-disable no-console */
  console.log('Header');
  let authComponent = authorizationStatus === AuthorizationStatus.Auth ? <AuthHeaderWithReduxProps/> : <NotAuthHeader/>;
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

export default Header;
