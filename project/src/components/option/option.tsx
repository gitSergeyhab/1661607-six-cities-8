import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { State } from '../../types/types';
import { changeOption } from '../../store/action';


const mapStateToProps = ({activeOption}: State) => ({activeOption});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({onOptionClick: changeOption}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type OptionProps = ConnectedProps<typeof connector> & {option: string, onCloseListClick: () => void};


function Option({activeOption, onOptionClick, option, onCloseListClick} : OptionProps): JSX.Element {

  const onClick = () => {
    onOptionClick(option);
    onCloseListClick();
  };

  return (
    <li
      onClick={onClick}
      className={`places__option ${activeOption === option ? 'places__option--active' : ''}`}
      tabIndex={0}
    >
      {option}
    </li>
  );
}

export default connector(Option);
