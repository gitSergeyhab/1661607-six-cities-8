import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { getNearby } from '../../store/room-data/room-data-selectors';

/* eslint-disable no-console */


function RoomNearbyCards({id} : {id: number}): JSX.Element {

  const neighbours = useSelector(getNearby);

  const dispatch = useDispatch();
  console.log('RoomNearbyCards');


  useEffect(() => {
    dispatch(fetchNearbyHotelsAction(id));
  }, [id, dispatch]);

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

export default RoomNearbyCards;
