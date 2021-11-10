import { useSelector } from 'react-redux';
import { getNetStatus } from '../../store/net-status/net-status-selectors';

import './net-status.css';

function NetStatus(): JSX.Element {
  const online = useSelector(getNetStatus);
  const containerClasses = online ?  'visually-hidden' : 'container net-status__container';

  return (
    <div className={containerClasses} data-testid='net-status-container'>
      <div className="header__wrapper">
        <div className="net-status__wrapper">
          <div className="net-status__text">
              no connection to the server
          </div>
        </div>
      </div>
    </div>
  );
}
export default NetStatus;
