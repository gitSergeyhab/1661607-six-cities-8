import { useDispatch, useSelector } from 'react-redux';
import { changeOption } from '../../store/action';
import { getActiveOption } from '../../store/main-data/main-data-selectors';


type OptionProps =  {option: string, onOptionsClick: () => void};


function Option({option, onOptionsClick} : OptionProps): JSX.Element {

  const activeOption = useSelector(getActiveOption);

  const dispatch = useDispatch();

  const handleSortOptionClick = () => {
    dispatch(changeOption(option));
    onOptionsClick();
  };

  return (
    <li
      onClick={handleSortOptionClick}
      className={`places__option ${activeOption === option ? 'places__option--active' : ''}`}
      tabIndex={0}
    >
      {option}
    </li>
  );
}

export default Option;
