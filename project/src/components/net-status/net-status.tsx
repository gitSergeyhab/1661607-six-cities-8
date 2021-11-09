import { useSelector } from 'react-redux';
import { getNetStatus } from '../../store/net-status/net-status-selectors';

function NetStatus(): JSX.Element {
  const status = useSelector(getNetStatus);

  if (status) {
    return <span></span>;
  }

  return (
    <div className="container">
      <div className="header__wrapper">
        <div style={{margin: 'auto', color: 'red', fontWeight: 'bold', fontSize: '20px'}}>no connection to the server</div>
      </div>
    </div>
  );
}
export default NetStatus;
