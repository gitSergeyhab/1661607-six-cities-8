import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthorizationStatus, CITIES } from '../../constants';
import MainEmpty from './main-empty';

const Text = {
  Status: /No places to stay available/i,
  Description: /We could not find any property available at the moment in/i,
};


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

    const status = getByText(Text.Status);
    const description = getByText(Text.Description);

    expect(status).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
