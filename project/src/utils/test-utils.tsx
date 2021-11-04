import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
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

    const {getByAltText, getByText} = render(
      <Provider store={mockStore({UserData: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <Router history={history}>
          {cardComponent}
        </Router>
      </Provider>,
    );

    const altText = getByAltText(CardText.Alt);
    const contentText = getByText(CardText.Content);

    expect(altText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });
});
