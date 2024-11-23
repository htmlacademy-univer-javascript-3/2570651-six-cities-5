import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@typings/offer';
import { Reviews } from '@typings/review';
import { OffersInDetails } from '@typings/offerInDetails';
import { City } from '@typings/city';
import { AuthorizationStatus, SortType } from '@const';

export const loadOffers = createAction<Offers>('offers/loadOffers');
export const loadOffersInDetails = createAction<OffersInDetails>('offers/loadOffersInDetails');
export const loadReviews = createAction<Reviews>('reviews/loadReviews');
export const changeCity = createAction<City>('city/changeCity');
export const setSortType = createAction<SortType>('setSortType');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
