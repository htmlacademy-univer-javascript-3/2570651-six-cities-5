import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '@utils/mock-component';
import App from './app';
import { AppRoute, AuthorizationStatus } from '@const';
import { makeFakeState } from '@utils/mocks';

describe('Application Routing', () => {
  it('should render LoadingScreen when auth status is unknown', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Unknown,
          userEmail: null,
          userAvatarUrl: null,
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: true
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render MainScreen on root route', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test@test.com',
          userAvatarUrl: 'avatar.jpg'
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/places/i)).toBeInTheDocument();
  });

  it('should render LoginScreen for unauthorized users', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should render NotFoundScreen for unknown route', () => {
    const history = createMemoryHistory();
    history.push('/unknown');

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });
});
