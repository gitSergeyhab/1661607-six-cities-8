import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import RoomNearbyCards from './room-nearby-cards';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled, TEST_ID } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateAuthAndFilled);

const nearby = <RoomNearbyCards id={TEST_ID}/>;

describe ('RoomNearbyCards Component', () => {
  it('should render correctly', () => {

    renderComponent(nearby, store, history);

    expect(screen.queryByText(ScreenText.Nearby.Title)).toBeInTheDocument();
    expect(screen.queryAllByRole('link').length)
      .toBe(stateAuthAndFilled.RoomData.nearby.length * 2);
    expect(screen.queryAllByText(ScreenText.Card.Night).length)
      .toBe(stateAuthAndFilled.RoomData.nearby.length);
  });
});
