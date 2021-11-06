import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AnyAction } from 'redux';
import { AuthorizationStatus } from '../constants';


export const initialStateAuth = {UserData: {authorizationStatus: AuthorizationStatus.Auth}};

export const renderComponent = (component: JSX.Element, store: MockStore<any, AnyAction>, history: History<unknown>) : any => render(
  <Provider store={store}>
    <Router history={history}>
      {component}
    </Router>
  </Provider>,
);

export const CardText = {
  Alt: /Place/i,
  Content: /night/i,
};


export const testCard = (cardComponent: JSX.Element, cardName: string): void => describe(`${cardName} Component`, () => {
  it('should render with altText "Place" ant text "night"', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({UserData: {authorizationStatus: AuthorizationStatus.Auth}});

    renderComponent(cardComponent, store, history);

    expect(screen.getByAltText(CardText.Alt)).toBeInTheDocument();
    expect(screen.getByText(CardText.Content)).toBeInTheDocument();
  });
});
