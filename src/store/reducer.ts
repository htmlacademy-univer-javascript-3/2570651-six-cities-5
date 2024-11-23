import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, loadOffersInDetails , loadReviews, setSortType, requireAuthorization, setError, setOffersDataLoadingStatus, setUserEmail } from './action';
import { AuthorizationStatus, Cities, SortType } from '@const';
import { Offers } from '@typings/offer';
import { Reviews } from '@typings/review';
import { City } from '@typings/city';
import { OffersInDetails } from '@typings/offerInDetails';

type StateType = {
  city: City;
  offers: Offers;
  offersInDetails: OffersInDetails;
  reviews: Reviews;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  userEmail: string;
};

const initialState: StateType = {
  city: Cities[0],
  offers: [],
  offersInDetails: [],
  reviews: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  userEmail: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = { ...payload };
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersInDetails, (state, action) => {
      state.offersInDetails = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserEmail, (state, { payload }) => {
      state.userEmail = payload;
    });
});
