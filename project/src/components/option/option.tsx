import { State } from '../../store/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { changeOption } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = ({activeOption}: State) => ({activeOption});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({onOptionClick: changeOption}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type OptionProps = ConnectedProps<typeof connector> & {option: string, onCloseListClick: () => void};
function Option({activeOption, onOptionClick, option, onCloseListClick} : OptionProps): JSX.Element {

  const onClick = (evt: /*MouseEvent<HTMLLIElement> ??? почему-то не работает ??? */ any) => {
    evt.preventDefault();
    const dataOption = evt.target.dataset;
    if (dataOption) {
      onOptionClick(dataOption.sort);
    }
    onCloseListClick();
  };

  return (
    <li
      onClick={onClick}
      className={`places__option ${activeOption === option ? 'places__option--active' : ''}`}
      data-sort={option} tabIndex={0}
    >
      {option}
    </li>
  );
}

export default connector(Option);
