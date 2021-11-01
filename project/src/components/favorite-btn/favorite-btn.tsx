import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AppRoute, AuthorizationStatus, CardType } from '../../constants';
import { postFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-data/user-data-selectors';
import { BtnFavoriteSetting } from '../../types/types';


type FavoriteBtnProps = {isFavorite: boolean, btnSetting: BtnFavoriteSetting, hotelId: number}

function FavoriteBtn({isFavorite, btnSetting, hotelId} : FavoriteBtnProps): JSX.Element {

  const history = useHistory();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const roomId = btnSetting.type === CardType.Room ? hotelId : 0;
  const status = isFavorite ? 0 : 1;
  const changeStatus = () => dispatch(postFavoriteStatus(hotelId, status, roomId));


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
