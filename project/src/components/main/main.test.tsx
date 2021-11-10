import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import Main from './main';
import { AuthorizationStatus } from '../../constants';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled, stateNoAuthAndEmpty } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const main = <Main authorizationStatus={AuthorizationStatus.Auth}/>;

describe('Main Component', () => {
  describe('filled', () => {

    const store = mockStore(stateAuthAndFilled);
    it('should render correctly', () => {

      renderComponent(main, store, history);

      expect(screen.getByText(ScreenText.Main.Filled.Places)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();
    });
  });

  describe('empty', () => {

    const store = mockStore(stateNoAuthAndEmpty);
    it('should render correctly', () => {

      renderComponent(main, store, history);

      expect(screen.getByText(ScreenText.Main.Empty.Description)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Empty.Status)).toBeInTheDocument();
    });
  });
});
