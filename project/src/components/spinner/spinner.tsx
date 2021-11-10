import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/react';


const override = css`
  display: block;
  margin: 0 auto;
`;

function Spinner(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <span className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <div className="cities">
          <div className="cities__places-container container">
            <h2 style={{margin: 'auto'}}>

              ... Loading ...
              <BarLoader css={override} color="#4481c3" width="150px"/>

            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Spinner;
