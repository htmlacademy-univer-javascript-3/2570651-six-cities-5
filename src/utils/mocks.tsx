import { OfferInDetails } from '@typings/offerInDetails';
import { Offers } from '@typings/offer';
import { Review, Reviews } from '@typings/review';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '@typings/state';
import { createAPI } from '@services/api';
import { AuthorizationStatus, Cities, SortType } from '@const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const makeFakeOffer = (): Offers[number] => ({
  id: generateId(),
  title: 'Tile House',
  type: 'house',
  price: Math.floor(Math.random() * 1000) + 100,
  previewImage: 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: Math.random() > 0.5,
  isPremium: Math.random() > 0.5,
  rating: parseFloat((Math.random() * 5).toFixed(1)),
});

export const makeFakeOfferDetails = (): OfferInDetails => ({
  id: generateId(),
  title: 'Tile House',
  type: 'house',
  price: Math.floor(Math.random() * 1000) + 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: Math.random() > 0.5,
  isPremium: Math.random() > 0.5,
  rating: parseFloat((Math.random() * 5).toFixed(1)),
  description:
    'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
  bedrooms: Math.floor(Math.random() * 5) + 1,
  maxAdults: Math.floor(Math.random() * 5) + 1,
  goods: ['Washing machine', 'Fridge', 'Kitchen', 'Washer', 'Dishwasher'],
  host: {
    name: 'Angelina',
    avatarUrl:
      'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    isPro: Math.random() > 0.5,
    email: 'angelina@example.com',
    token: 'G9erytRgDFcfse4feaGfsDSdrO1li21=',
  },
  images: [
    'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
  ],
});

export const makeFakeReview = (): Reviews[number] => ({
  id: generateId(),
  date: new Date().toISOString(),
  user: {
    name: 'Jane',
    avatarUrl: 'avatar2.jpg',
    isPro: Math.random() > 0.5,
    email: 'jane@example.com',
    token: 'Z3drmeEpSNmcse3kseRglADpcE3pj13=',
  },
  comment: 'Nice hotel',
  rating: parseFloat((Math.random() * 5).toFixed(1)),
});

export const makeFakeReviews = (count = 5): Reviews =>
  Array.from({ length: count }, () => makeFakeReview());

export const makeFakeOffers = (count = 5): Offers =>
  Array.from({ length: count }, () => makeFakeOffer());

export const makeFakeNearbyOffers = (count = 3): Offers =>
  makeFakeOffers(count);

export const makeFakeNewReview = (): Review => ({
  id: generateId(),
  date: new Date().toISOString(),
  user: {
    name: 'Mark',
    avatarUrl: 'avatar3.jpg',
    isPro: false,
    email: 'mark@example.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
  },
  comment: 'Amazing hotel woow',
  rating: 5,
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeState = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userEmail: 'test@example.com',
    userAvatarUrl: 'avatar.png',
  },
  APP: {
    city: Cities[2],
    sortType: SortType.PriceHighToLow,
  },
  CURRENT_OFFER: {
    offerInfo: makeFakeOfferDetails(),
    nearbyOffers: makeFakeNearbyOffers(3),
    reviews: makeFakeReviews(5),
    isOfferInDetailsDataLoading: true,
  },
  OFFERS: {
    offers: makeFakeOffers(10),
    favoritesCount: 1,
    isOffersDataLoading: true,
  },
  ...initialState,
});
