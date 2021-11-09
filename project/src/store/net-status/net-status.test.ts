import { changeNetStatus } from '../action';
import { netStatus } from './net-status';

const initState = {status: true};

describe('Reducer: netStatus', () => {
  it('without additional parameters should return initial state', () => {
    expect(netStatus(undefined, {type: 'FAKE'})).toEqual(initState);
  });

  it('should update status by changeNetStatus', () => {
    const state = {...initState};
    expect(netStatus(state, changeNetStatus(false))).toEqual({status: false});
  });
});
