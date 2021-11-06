import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AppRoute, AuthorizationStatus, BtnType, BtnSetting } from '../../constants';
import { postFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-data/user-data-selectors';


type FavoriteBtnProps = {isFavorite: boolean, btnType: BtnType, hotelId: number}

function FavoriteBtn({isFavorite, btnType, hotelId} : FavoriteBtnProps): JSX.Element {

  const btnSetting = BtnSetting[btnType];

  const history = useHistory();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const roomId = btnType === BtnType.Room ? hotelId : 0;
  const status = isFavorite ? 0 : 1;
  const changeStatus = () => dispatch(postFavoriteStatus(hotelId, status, roomId, btnType));


  const handleChangeFavoriteStatus = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return history.push(AppRoute.Login);
    }

    changeStatus();
  };


  const activeClass = isFavorite ? `${btnSetting.className}__bookmark-button--active` : '';

  return (
    <button className={`${btnSetting.className}__bookmark-button ${activeClass} button`} type="button" onClick={handleChangeFavoriteStatus}>
      <svg className={`${btnSetting.className}__bookmark-icon`} width={btnSetting.width} height={btnSetting.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteBtn;
