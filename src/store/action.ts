import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@typings/offer';
import { Reviews } from '@typings/review';
import { OffersInDetails } from '@typings/offerInDetails';
import { City } from '@typings/city';
import { SortType } from '@const';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffersInDetails = createAction<OffersInDetails>('offers/setOffersInDetails');
export const changeCity = createAction<City>('city/changeCity');
export const setSortType = createAction<SortType>('setSortType');
