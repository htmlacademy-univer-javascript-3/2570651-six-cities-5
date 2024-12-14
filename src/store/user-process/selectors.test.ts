import { describe, expect, it } from 'vitest';
import { getAuthorizationStatus, getUserEmail, getAvatarUrl } from './selectors';
import { AuthorizationStatus } from '@const';
import { makeFakeState } from '@utils/mocks';

describe('Selectors: userProcess', () => {
  const state = makeFakeState();

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
