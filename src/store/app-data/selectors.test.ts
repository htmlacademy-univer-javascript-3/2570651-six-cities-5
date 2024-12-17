import { getCity, getSortType } from './selectors';
import { describe, expect, it } from 'vitest';
import { Cities, SortType } from '@const';
import { makeFakeState } from '@utils/mocks';

describe('Selectors: appData', () => {
  const state = makeFakeState();

  it('should return the current city', () => {
    expect(getCity(state)).toBe(Cities[2]);
  });

  it('should return the current sortType', () => {
    expect(getSortType(state)).toBe(SortType.PriceHighToLow);
  });
});
