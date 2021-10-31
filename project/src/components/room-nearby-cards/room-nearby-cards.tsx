import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import RoomCard from '../room-card/room-card';
import { fetchNearbyHotelsAction } from '../../store/api-actions';
import { getNearby } from '../../store/room-data/room-data-selectors';
import { getFavoriteOffers } from '../../store/favorite-data/favorite-data-selectors';


function RoomNearbyCards({id} : {id: number}): JSX.Element {

  const neighbours = useSelector(getNearby);
  const favoriteOffers = useSelector(getFavoriteOffers);

  const dispatch = useDispatch();
  const getNeighbours = () => dispatch(fetchNearbyHotelsAction(id));


  useEffect(() => {
    getNeighbours();
  }, [id, favoriteOffers]);

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
