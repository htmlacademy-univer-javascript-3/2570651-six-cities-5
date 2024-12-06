import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@const';
import { AuthorizationStatus } from '@const';
import { UserProcess } from '@typings/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: null,
  userAvatarUrl: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserAvatarUrl: (state, action: PayloadAction<string>) => {
      state.userAvatarUrl = action.payload;
    },
  },
});

export const { setAuthorizationStatus, setUserEmail, setUserAvatarUrl } = userProcess.actions;
