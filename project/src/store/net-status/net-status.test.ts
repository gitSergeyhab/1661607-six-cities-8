import { changeNetStatus } from '../action';
import { netStatus } from './net-status';

const initState = {online: true};

describe('Reducer: netStatus', () => {
  it('without additional parameters should return initial state', () => {
    expect(netStatus(undefined, {type: 'FAKE'})).toEqual(initState);
  });

  it('should update online by changeNetStatus', () => {
    const state = {...initState};
    expect(netStatus(state, changeNetStatus(false))).toEqual({online: false});
  });
});
