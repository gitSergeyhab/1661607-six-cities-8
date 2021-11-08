
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Location from './location';
import { renderComponent } from '../../utils/test-utils';
// import { CITIES } from '../../constants';
import { initialCity, stateAuthAndFilled } from '../../utils/test-constants';
import { changeCity, changeMainOffers } from '../../store/action';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);

const city =  new RegExp(initialCity, 'i');

const location = <Location city={initialCity}/>;


describe('Locations Component', () => {
  it('render correctly', () => {

    renderComponent(location, store, history);

    expect(screen.getByText(city)).toBeInTheDocument();
    expect(screen.getByText(city).parentElement).toHaveClass(ACTIVE_CITY_CLASS);
  });

  it('should dispatch changeCity and changeMainOffers', () => {

    renderComponent(location, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('link'));

    expect(store.getActions()).toEqual([changeCity(initialCity), changeMainOffers(initialCity)]);
  });
});
