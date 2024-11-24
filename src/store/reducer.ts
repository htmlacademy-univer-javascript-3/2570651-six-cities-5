import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, loadOfferInDetails, setSortType, requireAuthorization, setError, setOffersDataLoadingStatus, setUserEmail, sendReview, setOfferInDetailsDataLoadingStatus } from './action';
import { AuthorizationStatus, Cities, SortType } from '@const';
import { Offers } from '@typings/offer';
import { Reviews } from '@typings/review';
import { City } from '@typings/city';
import { OfferInDetails } from '@typings/offerInDetails';

type StateType = {
  city: City;
  offers: Offers;
  selectedOffer: {
    offerInfo: OfferInDetails | null;
    nearbyOffers: Offers;
    reviews: Reviews;
  };
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferInDetailsDataLoading: boolean;
  userEmail: string | null;
};

const initialState: StateType = {
  city: Cities[0],
  offers: [],
  selectedOffer: {
    offerInfo: null,
    nearbyOffers: [],
    reviews: [],
  },
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  isOfferInDetailsDataLoading: false,
  userEmail: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = { ...payload };
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOfferInDetails, (state, { payload }) => {
      state.selectedOffer = {
        offerInfo: payload.offerInfo,
        nearbyOffers: payload.nearestOffers,
        reviews: payload.reviews
      };
    })
    .addCase(sendReview, (state, { payload }) => {
      state.selectedOffer.reviews.push(payload);
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, { payload }) => {
      state.userEmail = payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferInDetailsDataLoadingStatus, (state, action) => {
      state.isOfferInDetailsDataLoading = action.payload;
    });
});
