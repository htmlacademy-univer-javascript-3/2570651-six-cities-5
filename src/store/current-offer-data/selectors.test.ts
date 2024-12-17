import { describe, expect, it } from 'vitest';
import { getOfferInDetails, getNearbyOffers, getReviews, getOfferInDetailsDataLoadingStatus } from './selectors';
import { makeFakeState } from '@utils/mocks';

describe('Selectors: currentOfferData', () => {
  const state = makeFakeState();

  it('should return offer details', () => {
    expect(getOfferInDetails(state)).toEqual(state.CURRENT_OFFER.offerInfo);
  });

  it('should return nearby offers', () => {
    expect(getNearbyOffers(state)).toEqual(state.CURRENT_OFFER.nearbyOffers);
  });

  it('should return reviews', () => {
    expect(getReviews(state)).toEqual(state.CURRENT_OFFER.reviews);
  });

  it('should return the loading status of offer details', () => {
    expect(getOfferInDetailsDataLoadingStatus(state)).toBe(false);
  });
});
