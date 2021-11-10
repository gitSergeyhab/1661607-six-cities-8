import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import NetStatus from './net-status';
import { renderComponent } from '../../utils/test-utils';


const DATA_TEST_ID = 'net-status-container';
const text = new RegExp('no connection to the server', 'i');
const Classes = {
  Online: 'visually-hidden',
  Offline: 'container',
};

const history = createMemoryHistory();
const mockStore = configureMockStore();
const stateOnline = {NetStatus: {online: true}};
const stateOffline = {NetStatus: {online: false}};

const netStatus = <NetStatus/>;

describe('Component NetStatus', () => {
  it('online: should render correctly', () => {

    const store = mockStore(stateOnline);
    renderComponent(netStatus, store, history);

    expect(screen.queryByText(text)).toBeInTheDocument();
    const container = screen.queryByTestId(DATA_TEST_ID);
    expect(container).toBeInTheDocument();

    expect(container).toHaveClass(Classes.Online);
    expect(container).not.toHaveClass(Classes.Offline);
  });

  it('offline: should render correctly', () => {

    const store = mockStore(stateOffline);
    renderComponent(netStatus, store, history);

    expect(screen.queryByText(text)).toBeInTheDocument();
    const container = screen.queryByTestId(DATA_TEST_ID);
    expect(container).toBeInTheDocument();

    expect(container).not.toHaveClass(Classes.Online);
    expect(container).toHaveClass(Classes.Offline);
  });
});
