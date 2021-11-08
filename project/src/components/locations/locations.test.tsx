import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Locations from './locations';
import { renderComponent } from '../../utils/test-utils';
import { CITIES } from '../../constants';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';
const city = new RegExp(CITIES[0], 'i');

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {MainData: {city: 'Paris'}};
const store = mockStore(state);

describe('Locations Component', () => {
  it('render correctly', () => {
    const locations = <Locations/>;
    renderComponent(locations, store, history);

    expect(screen.getByText(city)).toBeInTheDocument();

    expect(screen.getByText(city).parentElement).toHaveClass(ACTIVE_CITY_CLASS);
    expect(screen.getByText(CITIES[CITIES.length-1]).parentElement).not.toHaveClass(ACTIVE_CITY_CLASS);
    expect(screen.queryAllByRole('link').length).toBe(CITIES.length);
  });
});
