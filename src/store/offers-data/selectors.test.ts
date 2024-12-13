import { describe, it, expect } from 'vitest';
import { getOffers, getOffersDataLoadingStatus, getFavoritesCount } from './selectors';
import { State } from '@typings/state';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '@mocks/state-mocks';
import { mockOffers } from '@mocks/mocks';

describe('Selectors: offersData', () => {
  const state: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return the list of offers', () => {
    expect(getOffers(state)).toEqual(mockOffers);
  });

  it('should return the loading status', () => {
    expect(getOffersDataLoadingStatus(state)).toBe(true);
  });

  it('should return the count of favorite offers', () => {
    expect(getFavoritesCount(state)).toBe(1);
  });
});
