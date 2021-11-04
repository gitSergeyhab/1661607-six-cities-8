import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { CITIES } from '../../constants';
import { renderComponent } from '../../utils/test-utils';
import Locations from './locations';


const city = new RegExp(CITIES[0], 'i');

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {MainData: {city: 'Paris'}};
const store = mockStore(state);

describe('Locations Component', () => {
  it('render Cities', () => {
    const locations = <Locations/>;
    renderComponent(locations, store, history);

    expect(screen.getByText(city)).toBeInTheDocument();
  });
});
