import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '@typings/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, makeFakeOffers, makeFakeOfferDetails } from '@utils/mocks';
import { fetchOffersAction, checkAuthAction, loginAction, logoutAction, updateFavoriteStatusAction, fetchOfferInDetailsAction } from './api-actions';
import { APIRoute } from '@const';
import * as tokenStorage from '@services/token';
import { vi } from 'vitest';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAPI = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch Pending and Fulfilled when server responds 200', async () => {
      const mockOffers = makeFakeOffers();
      mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        'OFFERS/setOffersDataLoadingStatus',
        'OFFERS/loadOffers',
        'OFFERS/setOffersDataLoadingStatus',
        fetchOffersAction.fulfilled.type
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch NoAuth status when server responds with error', async () => {
      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, { error: 'Unauthorized' });

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        'USER/setAuthorizationStatus',
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch Auth status when authorized', async () => {
      const mockUser = { email: 'test@test.com', avatarUrl: 'avatar.jpg' };
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, mockUser);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        'USER/setAuthorizationStatus',
        'USER/setUserEmail',
        'USER/setUserAvatarUrl',
        checkAuthAction.fulfilled.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should save token and update auth status', async () => {
      const mockUser = { token: 'secret' };
      mockAPI.onPost(APIRoute.Login).reply(200, mockUser);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction({ login: 'test@test.com', password: '123456' }));

      expect(mockSaveToken).toBeCalledWith(mockUser.token);
      const actions = store.getActions().map((action: Action<string>) => action.type);
      expect(actions).toEqual([
        loginAction.pending.type,
        'USER/setAuthorizationStatus',
        'USER/setUserEmail',
        loginAction.fulfilled.type
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch Logout and drop token', async () => {
      mockAPI.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalled();
      const actions = store.getActions().map((action: Action<string>) => action.type);
      expect(actions).toEqual([
        logoutAction.pending.type,
        'USER/setAuthorizationStatus',
        fetchOffersAction.pending.type,
        'OFFERS/setOffersDataLoadingStatus',
        logoutAction.fulfilled.type
      ]);
    });
  });

  describe('updateFavoriteStatusAction', () => {
    it('should update favorites status', async () => {
      const mockOffer = makeFakeOffers()[0];
      mockAPI.onPost(`${APIRoute.Favorite}/1/1`).reply(200, mockOffer);

      await store.dispatch(updateFavoriteStatusAction({ id: '1', isFavorite: true }));
      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        updateFavoriteStatusAction.pending.type,
        'OFFERS/updateFavorites',
        updateFavoriteStatusAction.fulfilled.type
      ]);
    });
  });

  describe('fetchOfferInDetailsAction', () => {
    it('should fetch offer details, nearby offers and reviews', async () => {
      const mockOffer = makeFakeOfferDetails();
      const mockNearbyOffers = makeFakeOffers(3);
      const mockId = '1';

      mockAPI
        .onGet(`${APIRoute.Offers}/${mockId}`).reply(200, mockOffer)
        .onGet(`${APIRoute.Offers}/${mockId}/nearby`).reply(200, mockNearbyOffers)
        .onGet(`${APIRoute.Comments}/${mockId}`).reply(200, []);

      await store.dispatch(fetchOfferInDetailsAction({ id: mockId }));
      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchOfferInDetailsAction.pending.type,
        'CURRENT_OFFER/setOfferInDetailsDataLoadingStatus',
        'CURRENT_OFFER/loadOfferInDetails',
        'CURRENT_OFFER/setOfferInDetailsDataLoadingStatus',
        fetchOfferInDetailsAction.fulfilled.type
      ]);
    });
  });
});
