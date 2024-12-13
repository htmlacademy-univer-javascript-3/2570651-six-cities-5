import { describe, expect, it } from 'vitest';
import { getAuthorizationStatus, getUserEmail, getAvatarUrl } from './selectors';
import { State } from '@typings/state';
import { AuthorizationStatus } from '@const';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '@mocks/state-mocks';

describe('Selectors: userProcess', () => {
  const state: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return the current authorization status', () => {
    expect(getAuthorizationStatus(state)).toBe(AuthorizationStatus.Auth);
  });

  it('should return the current user email', () => {
    expect(getUserEmail(state)).toBe('test@example.com');
  });

  it('should return the current user avatar URL', () => {
    expect(getAvatarUrl(state)).toBe('avatar.png');
  });
});
