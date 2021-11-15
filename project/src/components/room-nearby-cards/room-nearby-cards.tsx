import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { getNearby } from '../../store/room-data/room-data-selectors';


function RoomNearbyCards({id} : {id: number}): JSX.Element {

  const neighbours = useSelector(getNearby);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNearbyHotelsAction(id));
  }, [id, dispatch]);

  const neighbourCards = neighbours.map((neighbour) => <RoomCard offer={neighbour} key={neighbour.id}/>);

  const title = <h2 className="near-places__title">Other places in the neighbourhood</h2>;

  return (
    <section className="near-places places">

      {neighbours.length ? title : null}

      <div className="near-places__list places__list">

        {neighbourCards}

      </div>
    </section>
  );
}

export default RoomNearbyCards;
