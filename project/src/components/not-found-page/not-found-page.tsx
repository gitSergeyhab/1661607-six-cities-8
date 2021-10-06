import {Link} from 'react-router-dom';
import Header from '../header/header';
import {AppRoute} from '../../constants';


function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <Header/>

      <main className="page__main page__main--index page__main--index-empty">
        <section  style={{margin: '150px auto', textAlign: 'center'}}>
          <h1>ERROR 404<br/>Page Not Found</h1>
          <h2 className="place-card" style={{textTransform: 'uppercase', textDecoration: 'underline'}}> <Link to={AppRoute.Main}> to the main page </Link> </h2>
        </section>
      </main>
    </div>
  );
}

export default NotFoundPage;
