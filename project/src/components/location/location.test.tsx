
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Location from './location';
import { renderComponent } from '../../utils/test-utils';
import { stateAuthAndFilled } from '../../utils/test-constants';
import { changeCity, changeMainOffers } from '../../store/action';
import { CITIES } from '../../constants';


const ACTIVE_CITY_CLASS = 'tabs__item tabs__item--active';
const initialCity = CITIES[CITIES.length - 1];
const cityName =  new RegExp(initialCity, 'i');


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);


describe('Location Component', () => {

  const location = <Location city={initialCity}/>;

  it('render correctly', () => {

    renderComponent(location, store, history);

    expect(screen.getByText(cityName)).toBeInTheDocument();
    expect(screen.getByText(cityName).parentElement).not.toHaveClass(ACTIVE_CITY_CLASS);
  });

  it('should dispatch changeCity and changeMainOffers', () => {

    renderComponent(location, store, history);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('link'));

    expect(store.getActions()).toEqual([changeCity(initialCity), changeMainOffers(initialCity)]);
  });
});
