import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@const';
import { CurrentOfferData } from '@typings/state';
import { OfferInDetails } from '@typings/offerInDetails';
import { Offers } from '@typings/offer';
import { Review, Reviews } from '@typings/review';

const initialState: CurrentOfferData = {
  offerInfo: null,
  nearbyOffers: [],
  reviews: [],
  isOfferInDetailsDataLoading: false,
  favoritesCount: 0,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOfferInDetails: (state, action: PayloadAction<{ offerInfo: OfferInDetails; nearestOffers: Offers; reviews: Reviews }>) => {
      state.offerInfo = action.payload.offerInfo;
      state.nearbyOffers = action.payload.nearestOffers;
      state.reviews = action.payload.reviews;
    },
    sendReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setOfferInDetailsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOfferInDetailsDataLoading = action.payload;
    },
    updateFavoritesNearbyOffers: (state, action: PayloadAction<{ id: string; isFavorite: boolean }>) => {
      const { id, isFavorite } = action.payload;

      const updateFavoriteStatus = (offers: Offers) => {
        const offerIndex = offers.findIndex((offer) => offer.id === id);
        if (offerIndex !== -1) {
          offers[offerIndex].isFavorite = isFavorite;
        }
      };

      updateFavoriteStatus(state.nearbyOffers);

      state.favoritesCount = state.nearbyOffers.filter((offer) => offer.isFavorite).length;
    },
  },
});

export const { loadOfferInDetails, sendReview, setOfferInDetailsDataLoadingStatus, updateFavoritesNearbyOffers } = currentOfferData.actions;
