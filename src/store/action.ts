import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@typings/offer';
import { Review, Reviews } from '@typings/review';
import { City } from '@typings/city';
import { AuthorizationStatus, SortType } from '@const';
import { OfferInDetails } from '@typings/offerInDetails';

export const loadOffers = createAction<Offers>('offers/loadOffers');
export const loadOfferInDetails = createAction<{ offerInfo: OfferInDetails; nearestOffers: Offers; reviews: Reviews }>('offers/loadOfferInDetails');

export const sendReview = createAction<Review>('review/send');
export const changeCity = createAction<City>('city/changeCity');
export const setSortType = createAction<SortType>('setSortType');
export const setUserEmail = createAction<string>('setUserEmail');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('data/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setOfferInDetailsDataLoadingStatus = createAction<boolean>('data/setOfferInDetailsDataLoadingStatus');
export const updateOfferFavoriteStatus = createAction<{ id: string; isFavorite: boolean }>('offer/updateFavoriteStatus');
