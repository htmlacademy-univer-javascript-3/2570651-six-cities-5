import { describe, it, expect } from 'vitest';
import { getOffers, getOffersDataLoadingStatus, getFavoritesCount } from './selectors';
import { makeFakeState, makeFakeOffers } from '@utils/mocks';

describe('Selectors: offersData', () => {
  const fakeOffers = makeFakeOffers(5);
  const favoritesCount = fakeOffers.filter((offer) => offer.isFavorite).length;
  const state = makeFakeState({
    OFFERS: {
      offers: fakeOffers,
      isOffersDataLoading: true,
      favoritesCount,
    },
  });

  it('should return the list of offers', () => {
    expect(getOffers(state)).toEqual(fakeOffers);
  });

  it('should return the loading status', () => {
    expect(getOffersDataLoadingStatus(state)).toBe(true);
  });

  it('should return the count of favorite offers', () => {
    expect(getFavoritesCount(state)).toBe(favoritesCount);
  });
});
