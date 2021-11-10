import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import NetStatus from './net-status';
import { renderComponent } from '../../utils/test-utils';


const text = new RegExp('no connection to the server', 'i');

const history = createMemoryHistory();
const mockStore = configureMockStore();
const stateOnline = {NetStatus: {online: true}};
const stateOffline = {NetStatus: {online: false}};

const netStatus = <NetStatus/>;

describe('Component NetStatus', () => {
  it('online: should render correctly', () => {

    const store = mockStore(stateOnline);
    renderComponent(netStatus, store, history);

    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('offline: should render correctly', () => {

    const store = mockStore(stateOffline);
    renderComponent(netStatus, store, history);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
