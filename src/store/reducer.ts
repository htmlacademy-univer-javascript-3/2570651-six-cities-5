import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity, setReviews, setOffersInDetails, setSortType } from './action';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { OffersInDetails } from '../types/offerInDetails';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { offersInDetails } from '@mocks/offersInDetails';
import { City } from '../types/city';
import { Cities, SortType } from '@const';


type StateType = {
  city: City;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
  sortType: SortType;
};

const initialState: StateType = {
  city: Cities[0],
  offersList: [],
  reviews: [],
  offersInDetails: [],
  sortType: SortType.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = { ...payload };
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setOffersInDetails, (state) => {
      state.offersInDetails = offersInDetails;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    });
});
