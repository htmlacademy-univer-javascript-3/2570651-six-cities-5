import { appData, changeCity, setSortType } from './app-data';
import { Cities, SortType } from '@const';
import { describe, expect, it } from 'vitest';

const initialState = {
  city: Cities[0],
  sortType: SortType.Popular,
};

describe('Reducer: appData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = appData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should update the city when changeCity action is dispatched', () => {
    const newCity = Cities[1];
    const action = changeCity(newCity);
    const result = appData.reducer(initialState, action);
    expect(result.city).toBe(newCity);
  });

  it('should update the sortType when setSortType action is dispatched', () => {
    const newSortType = SortType.PriceLowToHigh;
    const action = setSortType(newSortType);
    const result = appData.reducer(initialState, action);
    expect(result.sortType).toBe(newSortType);
  });
});
