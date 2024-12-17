import { describe, it, expect } from 'vitest';
import { offersData, loadOffers, setOffersDataLoadingStatus, updateFavorites } from './offers-data';
import { makeFakeOffers } from '@utils/mocks';

const initialState = {
  offers: [],
  isOffersDataLoading: false,
  favoritesCount: 0,
};

describe('Reducer: offersData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = offersData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should load offers when loadOffers action is dispatched', () => {
    const fakeOffers = makeFakeOffers(5);
    const action = loadOffers(fakeOffers);
    const result = offersData.reducer(initialState, action);

    expect(result.offers).toEqual(fakeOffers);
  });

  it('should update loading status when setOffersDataLoadingStatus action is dispatched', () => {
    const action = setOffersDataLoadingStatus(true);
    const result = offersData.reducer(initialState, action);

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should update favorites and recalculate favoritesCount when updateFavorites action is dispatched', () => {
    const fakeOffers = makeFakeOffers(3);
    fakeOffers[0].id = '1';
    fakeOffers[0].isFavorite = false;

    const stateWithOffers = {
      ...initialState,
      offers: fakeOffers,
    };

    const action = updateFavorites({ id: '1', isFavorite: true });
    const result = offersData.reducer(stateWithOffers, action);

    const expectedFavoritesCount = result.offers.filter((offer) => offer.isFavorite).length;

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favoritesCount).toBe(expectedFavoritesCount);
  });
});
