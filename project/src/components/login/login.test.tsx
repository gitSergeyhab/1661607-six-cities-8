import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Login from './login';
import { changeCity, changeMainOffers } from '../../store/action';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateNotAuthAndFilled } from '../../utils/test-constants';
import { CITIES } from '../../constants';


const TEST_ID = 'random-city-link';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateNotAuthAndFilled);
const login = <Login/>;


describe('Login Component', () => {
  it('should render correctly', () => {

    renderComponent(login, store, history);

    expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
    const city = screen.getByTestId(TEST_ID).textContent;
    expect(CITIES).toContain(city);
  });

  it('should dispatch changeCity and changeMainOffers when click randomCity', () => {

    renderComponent(login, store, history);

    const cityBtn = screen.getByTestId(TEST_ID);
    const city = screen.getByTestId(TEST_ID).textContent || '';
    expect(store.getActions()).toEqual([]);

    userEvent.click(cityBtn);

    expect(store.getActions()).toEqual([changeCity(city), changeMainOffers(city)]);
  });
});
