import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { State, ThunkAppDispatch } from '../../types/types';
import { getNearby } from '../../store/room-data/room-data-selectors';
import { getFavoriteOffers } from '../../store/favorite-data/favorite-data-selectors';


const mapStateToProps = (state : State) => ({neighbours: getNearby(state), favoriteOffers: getFavoriteOffers(state)});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({getNeighbours: fetchNearbyHotelsAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type RoomNearbyCardsProps = PropsFromRedux & {id: number}

function RoomNearbyCards({id, neighbours, favoriteOffers, getNeighbours} : RoomNearbyCardsProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('RoomNearbyCards');
  useEffect(() => {
    getNeighbours(id);
  }, [id, getNeighbours, favoriteOffers]);

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
