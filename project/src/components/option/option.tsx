import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { changeOption } from '../../store/action';
import { State } from '../../types/types';


const mapStateToProps = ({activeOption}: State) => ({activeOption});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({changeSortOption: changeOption}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type OptionProps = ConnectedProps<typeof connector> & {option: string, closeOptions: () => void};


function Option({activeOption, changeSortOption, option, closeOptions} : OptionProps): JSX.Element {

  const handleSortOptionClick = () => {
    changeSortOption(option);
    closeOptions();
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

export default connector(Option);
