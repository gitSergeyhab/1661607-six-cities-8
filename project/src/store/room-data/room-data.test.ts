import { makeFakeCommentList, makeFakeOffer, makeFakeOfferList} from '../../utils/test-mocks';
import { changeRoomDataStatus, loadComments, loadNearby, loadOffer } from '../action';
import { RoomDataStatus } from '../../constants';
import { roomData } from './room-data';


const initState = {
  nearby: [],
  roomOffer: null,
  comments: [],
  roomDataStatus: RoomDataStatus.Loading,
};

const fakeOffer = makeFakeOffer();
const fakeNearby = makeFakeOfferList();
const fakeComments = makeFakeCommentList();


describe('Reducer: roomData', () => {
  let state = {...initState};
  beforeEach (() => state = {...initState});

  it('without additional parameters should return initial state', () => {
    expect(roomData(undefined, {type: 'FAKE_ACTION'}))
      .toEqual({...initState});
  });

  it('should update roomDataStatus by changeRoomDataStatus', () => {
    const expectedState = {...initState, roomDataStatus: RoomDataStatus.Ok};
    expect(roomData(state, changeRoomDataStatus(RoomDataStatus.Ok)))
      .toEqual(expectedState);
  });

  it('should update loadOffer by loadOffer', () => {
    const expectedState = {...initState, roomOffer: fakeOffer};
    expect(roomData(state, loadOffer(fakeOffer)))
      .toEqual(expectedState);
  });

  it('should update comments by loadComments', () => {
    const expectedState = {...initState, comments: fakeComments};
    expect(roomData(state, loadComments(fakeComments)))
      .toEqual(expectedState);
  });

  it('should update nearby by loadNearby', () => {
    const expectedState = {...initState, nearby: fakeNearby};
    expect(roomData(state, loadNearby(fakeNearby)))
      .toEqual(expectedState);
  });

});

