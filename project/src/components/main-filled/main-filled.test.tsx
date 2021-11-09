import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import MainFilled from './main-filled';
import { renderComponent } from '../../utils/test-utils';
import { makeFakeOfferList } from '../../utils/test-mocks';
import { initialCity, ScreenText, stateAuthAndFilled } from '../../utils/test-constants';
import { AuthorizationStatus, CITIES } from '../../constants';


const DataTestId = {
  Map: 'map',
  Logo: 'logo',
  Locations: 'locations',
};

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('MainFilled Component', () => {

  const main = <MainFilled authorizationStatus={AuthorizationStatus.Auth} offers={makeFakeOfferList()} selectedCity={initialCity}/>;
  const store = mockStore(stateAuthAndFilled);

  it('should render correctly', () => {

    renderComponent(main, store, history);

    const titleText = new RegExp(`${stateAuthAndFilled.MainData.offers.length} places to stay in ${stateAuthAndFilled.MainData.city}`, 'i');
    expect(screen.getByText(titleText)).toBeInTheDocument();

    expect(screen.getByTestId(DataTestId.Logo)).toBeInTheDocument();
    expect(screen.getByTestId(DataTestId.Map)).toBeInTheDocument();
    const locations = screen.getByTestId(DataTestId.Locations);
    expect(locations).toBeInTheDocument();
    expect(locations.querySelectorAll('li').length).toBe(CITIES.length);
    expect(screen.getAllByAltText(ScreenText.Card.ImgAlt).length).toBe(stateAuthAndFilled.MainData.offers.length);
  });
});
