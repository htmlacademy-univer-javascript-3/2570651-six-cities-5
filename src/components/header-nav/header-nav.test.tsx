import { render, screen, fireEvent } from '@testing-library/react';
import { withStore, withHistory } from '@utils/mock-component';
import MemoizedHeaderNav from './header-nav';
import { makeFakeState, makeFakeOffers, extractActionsTypes } from '@utils/mocks';
import { AuthorizationStatus } from '@const';
import { logoutAction } from '@store/api-actions';

describe('HeaderNav Component', () => {
  it('should display correct favorites count for authenticated user', () => {
    const fakeOffers = makeFakeOffers(3).map((offer) => ({ ...offer, isFavorite: true }));
    const initialState = makeFakeState({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
        userAvatarUrl: 'avatar.jpg',
      },
      OFFERS: {
        offers: fakeOffers,
        favoritesCount: 3,
        isOffersDataLoading: false,
      }
    });

    const { withStoreComponent } = withStore(<MemoizedHeaderNav />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should display zero favorites count when no favorites', () => {
    const fakeOffers = makeFakeOffers(3).map((offer) => ({ ...offer, isFavorite: false }));
    const initialState = makeFakeState({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
        userAvatarUrl: 'avatar.jpg',
      },
      OFFERS: {
        offers: fakeOffers,
        favoritesCount: 0,
        isOffersDataLoading: false,
      }
    });

    const { withStoreComponent } = withStore(<MemoizedHeaderNav />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should not display favorites count for unauthenticated user', () => {
    const initialState = makeFakeState({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
        userAvatarUrl: null,
      }
    });

    const { withStoreComponent } = withStore(<MemoizedHeaderNav />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should dispatch logout action when sign out clicked', () => {
    const initialState = makeFakeState({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
        userAvatarUrl: 'avatar.jpg',
      }
    });

    const { withStoreComponent, mockStore } = withStore(<MemoizedHeaderNav />, initialState);
    render(withHistory(withStoreComponent));

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    const actions = mockStore.getActions();
    expect(extractActionsTypes(actions)).toEqual([
      logoutAction.pending.type
    ]);
  });

  it('should display user email and avatar when authenticated', () => {
    const initialState = makeFakeState({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
        userAvatarUrl: 'avatar.jpg',
      }
    });

    const { withStoreComponent } = withStore(<MemoizedHeaderNav />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });
});
