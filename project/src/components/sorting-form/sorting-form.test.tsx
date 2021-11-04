import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { SortOption } from '../../constants';
import { renderComponent } from '../../utils/test-utils';
import SortingForm from './sorting-form';


const Text = {
  SortBy: /Sort By/i,
  City: new RegExp(SortOption.Popular, 'i'),
};

const history = createMemoryHistory();
const mockStore = configureMockStore();

const state = {MainData: {activeOption: SortOption.Popular}};

const store = mockStore(state);
describe('SortingForm Component', () => {
  it('render city and Sort by', () => {

    const sortingForm = <SortingForm/>;
    renderComponent(sortingForm, store, history);

    expect(screen.getByText(Text.City)).toBeInTheDocument();
    expect(screen.getByText(Text.SortBy)).toBeInTheDocument();

  });
});
