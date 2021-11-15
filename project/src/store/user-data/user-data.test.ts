import { AuthorizationStatus } from '../../constants';
import { requireAuthorization, requireLogout } from '../action';
import { userData } from './user-data';

const initState = {authorizationStatus: AuthorizationStatus.Auth};

describe('Reducer: userData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userData(undefined, {type: 'FAKE'})).toEqual(initState);
  });

  it('should update authorizationStatus by requireAuthorization', () => {
    const state = {...initState};
    expect(userData(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus by requireLogout', () => {
    const state = {authorizationStatus: AuthorizationStatus.Auth};
    expect(userData(state, requireLogout()))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
