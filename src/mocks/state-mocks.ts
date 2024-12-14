import { AuthorizationStatus, Cities, SortType } from '@const';
import { AppData, CurrentOfferData, OffersData, UserProcess } from '@typings/state';
import { mockNearbyOffers, mockOfferInfo, mockOffers, mockReviews } from './mocks';

export const mockAppState: AppData = {
  city: Cities[2],
  sortType: SortType.PriceHighToLow,
  error: 'Test error',
};

export const mockCurrentOfferState: CurrentOfferData = {
  offerInfo: mockOfferInfo,
  nearbyOffers: mockNearbyOffers,
  reviews: mockReviews,
  isOfferInDetailsDataLoading: true,
};

export const mockOffersState: OffersData = {
  offers: mockOffers,
  favoritesCount: 1,
  isOffersDataLoading: true,
};

export const mockUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  userEmail: 'test@example.com',
  userAvatarUrl: 'avatar.png',
};
