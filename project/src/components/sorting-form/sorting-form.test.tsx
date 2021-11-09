import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import SortingForm from './sorting-form';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText } from '../../utils/test-constants';
import { SortOption } from '../../constants';


const TextCity = new RegExp(SortOption.Popular, 'i');

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {MainData: {activeOption: SortOption.Popular}};
const store = mockStore(state);

describe('SortingForm Component', () => {
  it('render city and Sort by', () => {

    const sortingForm = <SortingForm/>;
    renderComponent(sortingForm, store, history);

    expect(screen.getByText(TextCity)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();
  });
});
