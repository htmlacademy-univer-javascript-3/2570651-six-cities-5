import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { OffersInDetails } from '../types/offerInDetails';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffersInDetails = createAction<OffersInDetails>('offers/setOffersInDetails');
export const changeCity = createAction<string>('city/changeCity');
