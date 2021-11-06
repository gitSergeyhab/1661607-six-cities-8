import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';

import Header from './header';
import { AuthorizationStatus } from '../../constants';


const history = createMemoryHistory();

const Text = {
  SignIn: /Sign in/i,
  SignOut: /Sign Out/i,
  Alt: /6 cities logo/i,
};

const mockStore = configureMockStore();

const renderHeader = (authorizationStatus: AuthorizationStatus) => render(
  <Provider store={mockStore({})}>
    <Router history={history}>
      <Header authorizationStatus={authorizationStatus}/>
    </Router>,
  </Provider>,
);


describe('Component Header', () => {

  it('should render with altText and "Sign Out" for AuthorizationStatus.Auth', () => {

    const {getByText, getByAltText} = renderHeader(AuthorizationStatus.Auth);
    const headerElement = getByText(Text.SignOut);
    const altText = getByAltText(Text.Alt);
    expect(altText).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
  });

  it('should render with altText and "Sign In" for AuthorizationStatus.NoAuth', () => {

    const {getByText, getByAltText} = renderHeader(AuthorizationStatus.NoAuth);
    const headerElement = getByText(Text.SignIn);
    const altText = getByAltText(Text.Alt);
    expect(headerElement).toBeInTheDocument();
    expect(altText).toBeInTheDocument();
  });
});
