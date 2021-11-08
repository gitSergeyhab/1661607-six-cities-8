import thunk from 'redux-thunk';
// import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Map from './map';
import { renderComponent } from '../../utils/test-utils';
import { initialCity, stateNotAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { CityCoordinate } from '../../constants';
import { makeFakeOfferList } from '../../utils/test-mocks';

const MAP_TEST_ID = 'map';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateNotAuthAndFilled);

const center = CityCoordinate[initialCity.toUpperCase()];
const offers = makeFakeOfferList();

const mapComponent = <Map center={center} offers={offers} selectedId={TEST_ID}/>;

describe('Map Component', () => {
  it('should render correctly', () => {

    renderComponent(mapComponent, store, history);

    expect(screen.getByTestId(MAP_TEST_ID)).toBeInTheDocument();
  });
});
