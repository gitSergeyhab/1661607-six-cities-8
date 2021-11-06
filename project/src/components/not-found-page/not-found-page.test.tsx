import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus } from '../../constants';
import { initialStateAuth, renderComponent } from '../../utils/test-utils';
import NotFoundPage from './not-found-page';

const TEXT = /ERROR 404/i;


describe('NotFoundPage Component', () => {
  const notFoundPage = <NotFoundPage authorizationStatus={AuthorizationStatus.Auth}/>;
  const mockStore = configureMockStore();
  const store = mockStore(initialStateAuth);
  const history = createMemoryHistory();
  it('should render ERROR 404', () => {

    const {getByText} = renderComponent(notFoundPage, store, history);
    const textElement = getByText(TEXT);
    expect(textElement).toBeInTheDocument();

  });
});
