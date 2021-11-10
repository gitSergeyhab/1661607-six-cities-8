import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import MainEmpty from './main-empty';
import { AuthorizationStatus, CITIES } from '../../constants';
import { ScreenText } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const testCity = CITIES[1];

const store = mockStore({
  UserData: {authorizationStatus: AuthorizationStatus.Auth},
  MainData: {city: testCity},
});

describe('MainEmpty Component', () => {
  it('should render text Status, Description', () => {
    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <MainEmpty authorizationStatus={AuthorizationStatus.Auth} selectedCity={testCity}/>
        </Router>
      </Provider>,
    );

    const status = getByText(ScreenText.Main.Empty.Status);
    const description = getByText(ScreenText.Main.Empty.Description);

    expect(status).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
