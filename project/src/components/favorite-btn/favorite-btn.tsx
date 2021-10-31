import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { AppRoute, AuthorizationStatus, CardType } from '../../constants';
import { postFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-data/user-data-selectors';
import { BtnFavoriteSetting, ThunkAppDispatch, State } from '../../types/types';


const mapStateToProps = (state: State) => ({authorizationStatus: getAuthorizationStatus(state)});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({changeStatus: postFavoriteStatus}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type FavoriteBtnProps = PropsFromRedux & {isFavorite: boolean, btnSetting: BtnFavoriteSetting, hotelId: number}


function FavoriteBtn({isFavorite, btnSetting, authorizationStatus, hotelId, changeStatus}: FavoriteBtnProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('FavoriteBtn', btnSetting.type);

  const history = useHistory();

  const handleChangeFavoriteStatus = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return history.push(AppRoute.Login);
    }
    const roomId = btnSetting.type === CardType.Room ? hotelId : 0;
    const status = isFavorite ? 0 : 1;
    changeStatus(hotelId, status, roomId);
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

export default connector(FavoriteBtn);
