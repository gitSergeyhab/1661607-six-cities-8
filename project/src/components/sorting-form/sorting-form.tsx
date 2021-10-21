import { useState } from 'react';
import { connect } from 'react-redux';

import Option from '../option/option';
import { State } from '../../store/reducer';
import { SortOption } from '../../constants';


function SortingList({onCloseListClick} : {onCloseListClick: () => void}): JSX.Element {
  const optionList = Object.keys(SortOption).map((key) => <Option onCloseListClick={onCloseListClick} option={SortOption[key]} key={key}/>);
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {optionList}
    </ul>
  );
}


const mapStateToProps = ({activeOption}: State) => ({activeOption});

function SortingForm({activeOption} : {activeOption: string}): JSX.Element {

  const [isOptionsShown, toggleShowingOption] = useState(false);

  const onArrowClick = () => {
    toggleShowingOption((prevState) => !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onArrowClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOptionsShown ? <SortingList onCloseListClick={onArrowClick}/> : ''}
    </form>
  );
}

export default connect(mapStateToProps)(SortingForm);