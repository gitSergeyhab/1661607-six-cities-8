import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import Map from './map';
import { renderComponent } from '../../utils/test-utils';
import { makeFakeOfferList } from '../../utils/test-mocks';
import { initialCity, stateNotAuthAndFilled, TEST_ID } from '../../utils/test-constants';
import { CityCoordinate } from '../../constants';


const MAP_TEST_ID = 'map';
const center = CityCoordinate[initialCity.toUpperCase()];
const offers = makeFakeOfferList();

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateNotAuthAndFilled);

const mapComponent = <Map center={center} offers={offers} selectedId={TEST_ID}/>;

describe('Map Component', () => {
  it('should render correctly', () => {

    renderComponent(mapComponent, store, history);

    expect(screen.getByTestId(MAP_TEST_ID)).toBeInTheDocument();
  });
});
