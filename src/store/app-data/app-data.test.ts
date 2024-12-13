import { appData, changeCity, setSortType, setError } from './app-data';
import { Cities, SortType } from '../../const';
import { describe, expect, it } from 'vitest';

const initialState = {
  city: Cities[0],
  sortType: SortType.Popular,
  error: null,
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

  it('should update the error when setError action is dispatched', () => {
    const error = 'Something went wrong';
    const action = setError(error);
    const result = appData.reducer(initialState, action);
    expect(result.error).toBe(error);
  });

  it('should clear the error when setError action is dispatched with null', () => {
    const action = setError(null);
    const modifiedState = { ...initialState, error: 'Some error' };
    const result = appData.reducer(modifiedState, action);
    expect(result.error).toBeNull();
  });
});
