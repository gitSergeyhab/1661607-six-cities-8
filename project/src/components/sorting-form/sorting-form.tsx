import { useState } from 'react';
import { connect } from 'react-redux';

import Option from '../option/option';
import { State } from '../../types/types';
import { SortOption } from '../../constants';
import { getActiveOption } from '../../store/main-data/main-data-selectors';


function SortingList({onOptionsClick} : {onOptionsClick: () => void}): JSX.Element {
  const optionList = Object.keys(SortOption).map((key) => <Option onOptionsClick={onOptionsClick} option={SortOption[key]} key={key}/>);
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {optionList}
    </ul>
  );
}


const mapStateToProps = (state: State) => ({activeOption: getActiveOption(state)});

function SortingForm({activeOption} : {activeOption: string}): JSX.Element {

  const [isOptionsShown, toggleShowingOption] = useState(false);

  const handleArrowClick = () => {
    toggleShowingOption((prevState) => !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleArrowClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOptionsShown ? <SortingList onOptionsClick={handleArrowClick}/> : ''}
    </form>
  );
}

export default connect(mapStateToProps)(SortingForm);
