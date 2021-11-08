import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import Room from './room';
import { AuthorizationStatus, STARS } from '../../constants';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled } from '../../utils/test-constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Room Component', () => {
  const titleText = new RegExp(`${stateAuthAndFilled.RoomData.roomOffer.title}`, 'i');
  describe('AUTH and FILLED', () => {
    const room = <Room authorizationStatus={AuthorizationStatus.Auth}/>;
    const store = mockStore(stateAuthAndFilled);

    it('should render correctly', () => {

      renderComponent(room, store, history);

      expect(screen.getByText(titleText)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.Auth.YourReview)).toBeInTheDocument();
      expect(screen.getAllByRole('radio').length).toBe(STARS.length);
      expect(screen.getAllByText(ScreenText.Card.Night).length)
        .toBe(stateAuthAndFilled.RoomData.nearby.length + 1);
      expect(screen.getAllByAltText(ScreenText.Comment.AltReviewAvatar).length)
        .toBe(stateAuthAndFilled.RoomData.comments.length);
    });
  });

  describe('FILLED and NO_AUTH', () => {
    const room = <Room authorizationStatus={AuthorizationStatus.NoAuth}/>;
    const store = mockStore(stateAuthAndFilled);

    it('should render correctly', () => {

      renderComponent(room, store, history);

      expect(screen.getByText(titleText)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
      expect(screen.getAllByText(ScreenText.Card.Night).length)
        .toBe(stateAuthAndFilled.RoomData.nearby.length + 1);
      expect(screen.getAllByAltText(ScreenText.Comment.AltReviewAvatar).length)
        .toBe(stateAuthAndFilled.RoomData.comments.length);

      expect(screen.queryByText(ScreenText.Room.Auth.YourReview)).not.toBeInTheDocument();
      expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    });
  });
  describe('AUTH and NO_COMMENTS', () => {
    const room = <Room authorizationStatus={AuthorizationStatus.Auth}/>;
    const stateNoComments = {
      ...stateAuthAndFilled, RoomData: {
        ...stateAuthAndFilled.RoomData, comments: [],
      }};
    const store = mockStore(stateNoComments);

    it('should render correctly', () => {

      renderComponent(room, store, history);

      expect(screen.getByText(titleText)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Room.Auth.YourReview)).toBeInTheDocument();
      expect(screen.getAllByRole('radio').length).toBe(STARS.length);
      expect(screen.getAllByText(ScreenText.Card.Night).length)
        .toBe(stateAuthAndFilled.RoomData.nearby.length + 1);

      expect(screen.queryAllByAltText(ScreenText.Comment.AltReviewAvatar).length).toBe(0);
    });
  });
});
