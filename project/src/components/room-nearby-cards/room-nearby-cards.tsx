import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { State, ThunkAppDispatch } from '../../types/types';


const mapStateToProps = ({nearby} : State) => ({neighbours: nearby});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({getNearby: fetchNearbyHotelsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

function RoomNearbyCards({id, neighbours, getNearby} : {id: number} & PropsFromRedux): JSX.Element {

  useEffect(() => {
    getNearby(id);
  }, [id, getNearby]);

  const neighbourCards = neighbours.map((neighbour) => <RoomCard offer={neighbour} key={neighbour.id}/>);

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
