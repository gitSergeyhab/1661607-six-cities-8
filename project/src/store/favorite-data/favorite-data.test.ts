import { favoriteData } from './favorite-data';
import { loadFavoriteOffers } from '../action';
import { makeFakeFavoritesList } from '../../utils/test-mocks';


const favorites = makeFakeFavoritesList();

describe('Reducer: favoriteData', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoriteData(undefined, {type: 'FAKE_ACTION'}))
      .toEqual({favoriteOffers: [], areFavoritesLoaded: false});
  });

  it('should update favorites by loadFavoriteOffers', () => {
    const state = {favoriteOffers: [], areFavoritesLoaded: false};
    expect(favoriteData(state, loadFavoriteOffers(favorites)))
      .toEqual({favoriteOffers: favorites, areFavoritesLoaded: true});
  });
});
