
import {renderHook} from '@testing-library/react-hooks';

import useMap from './use-map';
import { CityCoordinate } from '../constants';
import { initialCity } from '../utils/test-constants';
import { useRef } from 'react';

// совершенно бесполезный тест //
describe('Hook: useMap', () => {
  it('should render correctly', () => {
    const center = CityCoordinate[initialCity.toUpperCase()];
    const mapRef = renderHook(() => useRef(null)).result.current;
    const {result} = renderHook(() => useMap(mapRef, center));
    expect(result).toBeInstanceOf(Object);
  });
});
