import {ButtonFavorite} from '../../constants';


function FavoriteBtn({isFavorite, btn}: {isFavorite: boolean, btn: ButtonFavorite}): JSX.Element {
  const activeClass = isFavorite ? `${btn.className}__bookmark-button--active` : '';
  return (
    <button className={`${btn.className}__bookmark-button ${activeClass} button`} type="button">
      <svg className={`${btn.className}__bookmark-icon`} width={btn.width} height={btn.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteBtn;


