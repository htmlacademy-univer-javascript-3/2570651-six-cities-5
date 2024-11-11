import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity, setReviews, setOffersInDetails } from './action';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { OffersInDetails } from '../types/offerInDetails';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { offersInDetails } from '@mocks/offersInDetails';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setOffersInDetails, (state) => {
      state.offersInDetails = offersInDetails;
    });
});
