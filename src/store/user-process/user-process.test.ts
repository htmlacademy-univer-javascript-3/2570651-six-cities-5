import { userProcess, setAuthorizationStatus, setUserEmail, setUserAvatarUrl } from './user-process';
import { describe, expect, it } from 'vitest';
import { AuthorizationStatus } from '@const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: null,
  userAvatarUrl: null,
};

describe('Reducer: userProcess', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = userProcess.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should update the authorization status when setAuthorizationStatus action is dispatched', () => {
    const action = setAuthorizationStatus(AuthorizationStatus.Auth);
    const result = userProcess.reducer(initialState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should update the user email when setUserEmail action is dispatched', () => {
    const email = 'test@example.com';
    const action = setUserEmail(email);
    const result = userProcess.reducer(initialState, action);
    expect(result.userEmail).toBe(email);
  });

  it('should update the user avatar URL when setUserAvatarUrl action is dispatched', () => {
    const avatarUrl = 'avatar.png';
    const action = setUserAvatarUrl(avatarUrl);
    const result = userProcess.reducer(initialState, action);
    expect(result.userAvatarUrl).toBe(avatarUrl);
  });
});
