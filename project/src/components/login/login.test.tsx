import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { CITIES } from '../../constants';
import { ScreenText, stateNoAuthAndEmpty } from '../../utils/test-constants';
import { renderComponent } from '../../utils/test-utils';
import Login from './login';

const TEST_ID = 'random-city-link';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateNoAuthAndEmpty);


describe('Login Component', () => {
  it('should render correctly', () => {
    const login = <Login/>;
    renderComponent(login, store, history);

    expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
    const city = screen.getByTestId(TEST_ID).textContent;
    expect(CITIES).toContain(city);
  });
});
