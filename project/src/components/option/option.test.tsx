import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import Option from './option';
import { renderComponent } from '../../utils/test-utils';
import { changeOption } from '../../store/action';
import { stateAuthAndFilled } from '../../utils/test-constants';
import { SortOption } from '../../constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);

const propOption = SortOption.TopRated;
const screenOption = new RegExp(propOption, 'i');

describe('Option Component', () => {
  it('should render correctly', () => {

    const option = <Option option={propOption} onOptionsClick={jest.fn()}/>;
    renderComponent(option, store, history);

    expect(screen.queryByText(screenOption)).toBeInTheDocument();
  });

  it('should dispatch changeOption and call onOptionsClick', () => {

    const onOptionsClick = jest.fn();
    const option = <Option option={propOption} onOptionsClick={onOptionsClick}/>;
    renderComponent(option, store, history);

    const optionLi = screen.getByRole('listitem');
    expect(optionLi).toBeInTheDocument();
    expect(store.getActions()).toEqual([]);

    userEvent.click(optionLi);

    expect(store.getActions()).toEqual([changeOption(optionLi.textContent || '')]);
    expect(onOptionsClick).toBeCalledTimes(1);
  });
});
