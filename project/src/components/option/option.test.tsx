import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import Option from './option';
import { renderComponent } from '../../utils/test-utils';
import { AppRoute, SortOption } from '../../constants';
import { stateNoAuthAndEmpty } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateNoAuthAndEmpty);

const propOption = SortOption.TopRated;

const screenOption = new RegExp(propOption, 'i');

describe('Option Component', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Login);
    const option = <Option option={propOption} onOptionsClick={jest.fn()}/>;
    renderComponent(option, store, history);

    expect(screen.queryByText(screenOption)).toBeInTheDocument();
  });
});
