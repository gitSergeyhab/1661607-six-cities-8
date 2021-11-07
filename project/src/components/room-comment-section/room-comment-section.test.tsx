import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import RoomCommentSection from './room-comment-section';
import { renderComponent } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled, stateNoAuthAndEmpty, TEST_ID } from '../../utils/test-constants';
import { AuthorizationStatus, STARS } from '../../constants';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);


describe('RoomCommentSection Component', () => {
  describe('AUTH and FILLED', () => {
    const store = mockStore(stateAuthAndFilled);
    const roomCommentSection = <RoomCommentSection id={TEST_ID} authorizationStatus={AuthorizationStatus.Auth}/>;

    it ('should render correctly', () => {
      renderComponent(roomCommentSection, store, history);

      expect(screen.getByText(ScreenText.Comment.Title)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(stateAuthAndFilled.RoomData.comments.length);
      expect(screen.getAllByRole('radio').length).toBe(STARS.length);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('NO_AUTH and EMPTY', () => {
    const store = mockStore(stateNoAuthAndEmpty);
    const roomCommentSection = <RoomCommentSection id={TEST_ID} authorizationStatus={AuthorizationStatus.NoAuth}/>;

    it ('should render correctly', () => {
      renderComponent(roomCommentSection, store, history);

      expect(screen.getByText(ScreenText.Comment.Title)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
      expect(screen.queryByRole('radio')).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

});
