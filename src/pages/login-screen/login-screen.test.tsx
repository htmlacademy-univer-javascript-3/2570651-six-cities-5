import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import LoginScreen from './login-screen';
import { makeFakeState } from '@utils/mocks';
import { AuthorizationStatus } from '@const';

describe('Component: LoginScreen', () => {
  it('renders login form', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginScreen />),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null,
        }
      })
    );

    const { container } = render(withStoreComponent);

    const form = container.querySelector('.login__form');
    const emailInput = container.querySelector('input[type="email"]');
    const passwordInput = container.querySelector('input[type="password"]');
    const submitButton = container.querySelector('button[type="submit"]');

    expect(form).not.toBeNull();
    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(submitButton).not.toBeNull();
  });

  it('displays correct title', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginScreen />),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null,
        }
      })
    );

    const { container } = render(withStoreComponent);
    const title = container.querySelector('.login__title');

    expect(title?.textContent).toBe('Sign in');
  });
});
