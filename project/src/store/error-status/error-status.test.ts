import { changeFavoritesErrorStatus, changeMainErrorStatus, changeRoomErrorStatus } from '../action';
import { errorStatus } from './error-status';

const initState = {main: false, room: false, favorites: false};

let state = {...initState};

describe('Reducer: ErrorStatus', () => {

  beforeEach(() => state = {...initState});

  it('without additional parameters should return initial state', () => {
    expect(errorStatus(undefined, {type: 'FAKE'})).toEqual(initState);
  });

  it('should update errorStatus.main by changeMainErrorStatus', () => {
    expect(errorStatus(state, changeMainErrorStatus(true))).toEqual({main: true, room: false, favorites: false});
  });

  it('should update errorStatus.room by changeRoomErrorStatus', () => {
    expect(errorStatus(state, changeRoomErrorStatus(true))).toEqual({main: false, room: true, favorites: false});
  });

  it('should update errorStatus.favorites by changeFavoritesErrorStatus', () => {
    expect(errorStatus(state, changeFavoritesErrorStatus(true))).toEqual({main: false, room: false, favorites: true});
  });
});
