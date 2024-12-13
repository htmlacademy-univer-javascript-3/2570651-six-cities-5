import { currentOfferData, loadOfferInDetails, sendReview, setOfferInDetailsDataLoadingStatus } from './current-offer-data';
import { describe, expect, it } from 'vitest';
import { mockOfferInfo, mockNearbyOffers, mockReviews, mockNewReview } from '@mocks/mocks';

const initialOfferState = {
  offerInfo: null,
  nearbyOffers: [],
  reviews: [],
  isOfferInDetailsDataLoading: false,
};

describe('Reducer: currentOfferData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = currentOfferData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialOfferState);
  });

  it('should load offer details, nearby offers, and reviews', () => {
    const action = loadOfferInDetails({ offerInfo: mockOfferInfo, nearestOffers: mockNearbyOffers, reviews: mockReviews });
    const result = currentOfferData.reducer(initialOfferState, action);
    expect(result.offerInfo).toEqual(mockOfferInfo);
    expect(result.nearbyOffers).toEqual(mockNearbyOffers);
    expect(result.reviews).toEqual(mockReviews);
  });

  it('should add a new review', () => {
    const action = sendReview(mockNewReview);
    const result = currentOfferData.reducer({ ...initialOfferState, reviews: [] }, action);
    expect(result.reviews).toContain(mockNewReview);
  });

  it('should set loading status', () => {
    const action = setOfferInDetailsDataLoadingStatus(true);
    const result = currentOfferData.reducer(initialOfferState, action);
    expect(result.isOfferInDetailsDataLoading).toBe(true);
  });
});
