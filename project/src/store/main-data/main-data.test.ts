import { mainData } from './main-data';
import { makeFakeOfferList} from '../../utils/mocks';
import { changeCity, changeMainOffers, changeOption, loadOffers } from '../action';
import { getOffersByCity, getSortedOffers } from '../../utils/util';
import { CITIES, SortOption } from '../../constants';


const INITIAL_CITY_INDEX = 0;
const TEST_CITY_INDEX = 1;

const initialCity = CITIES[INITIAL_CITY_INDEX];
const testCity = CITIES[TEST_CITY_INDEX];
const testOption = SortOption.TopRated;

const initState = {
  allOffers: [],
  areHotelsLoaded: false,
  city: initialCity,
  originOffers: [],
  offers: getOffersByCity([], initialCity),
  activeOption: SortOption.Popular,
};

const fakeOffers = makeFakeOfferList();


describe('Reducer: mainData', () => {
  it('without additional parameters should return initial state', () => {
    expect(mainData(undefined, {type: 'FAKE_ACTION'}))
      .toEqual({...initState});
  });

  it('should update allOffers by loadOffers', () => {
    const state = {...initState};
    const expectedState = {...initState, allOffers: fakeOffers,  areHotelsLoaded: true};
    expect(mainData(state, loadOffers(fakeOffers)))
      .toEqual(expectedState);
  });

  it('should update city by changeCity', () => {
    const state = {...initState};
    const expectedState = {...initState, city: testCity};
    expect(mainData(state, changeCity(testCity)))
      .toEqual(expectedState);
  });

  it('should update originOffers and offers by changeMainOffers', () => {
    const state = {...initState, allOffers: fakeOffers, areHotelsLoaded: true, city: testCity};
    const filteredOffers = getOffersByCity(state.allOffers, testCity);
    const expectedState = {...state, city: testCity, originOffers: filteredOffers, offers: filteredOffers };
    expect(mainData(state, changeMainOffers(testCity)))
      .toEqual(expectedState);
  });

  it('should update activeOption and offers by changeOption', () => {
    const state = {...initState, originOffers: fakeOffers};
    const sortedOffers = getSortedOffers(state.originOffers, testOption);
    const expectedState = {...state, offers: sortedOffers, activeOption: testOption};
    expect(mainData(state, changeOption(testOption)))
      .toEqual(expectedState);
  });
});

