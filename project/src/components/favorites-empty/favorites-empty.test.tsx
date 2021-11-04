import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthorizationStatus } from '../../constants';
import FavoritesEmpty from './favorites-empty';

const Text = {
  Status: /Nothing yet saved/i,
  Description: /Save properties to narrow down search or plan your future trips/i,
};


const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('FavoritesEmpty Component', () => {
  it('should render text Status and Description', () => {
    const {getByText} = render(
      <Provider store={mockStore({UserData: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <Router history={history}>
          <FavoritesEmpty/>
        </Router>
      </Provider>,
    );

    const status = getByText(Text.Status);
    const description = getByText(Text.Description);

    expect(status).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
