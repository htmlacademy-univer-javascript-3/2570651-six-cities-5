import { getCity, getSortType, getError } from './selectors';
import { describe, expect, it } from 'vitest';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '@mocks/state-mocks';
import { State } from '@typings/state';
import { Cities, SortType } from '@const';

describe('Selectors: appData', () => {
  const state: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return the current city', () => {
    expect(getCity(state)).toBe(Cities[2]);
  });

  it('should return the current sortType', () => {
    expect(getSortType(state)).toBe(SortType.PriceHighToLow);
  });

  it('should return the current error', () => {
    expect(getError(state)).toBe('Test error');
  });
});
