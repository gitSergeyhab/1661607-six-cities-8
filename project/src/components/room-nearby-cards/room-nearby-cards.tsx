import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { State, ThunkAppDispatch } from '../../types/types';


const mapStateToProps = ({nearby, favoriteOffers} : State) => ({neighbours: nearby, favoriteOffers});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({getNearby: fetchNearbyHotelsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type RoomNearbyCardsProps = PropsFromRedux & {id: number, nearbyRoomId: number}

function RoomNearbyCards({id, neighbours, favoriteOffers, nearbyRoomId, getNearby} : RoomNearbyCardsProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('RoomNearbyCards');
  useEffect(() => {
    getNearby(id);
  }, [id, getNearby, favoriteOffers]);

  const neighbourCards = neighbours.map((neighbour) => <RoomCard offer={neighbour} key={neighbour.id} nearbyRoomId={nearbyRoomId}/>);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">

        {neighbourCards}

      </div>
    </section>
  );
}

export default connector(RoomNearbyCards);
