import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { OffersInDetails } from '../types/offerInDetails';
import { City } from '../types/city';
import { SortType } from '@const';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffersInDetails = createAction<OffersInDetails>('offers/setOffersInDetails');
export const changeCity = createAction<City>('city/changeCity');
export const setSortType = createAction<SortType>('setSortType');
