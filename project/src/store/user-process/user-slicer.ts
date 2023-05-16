import type { UserStore } from '../../types/state';
import { Authorization, StoreSliceName } from '../../utils/consts';
import { createSlice } from '@reduxjs/toolkit';
import { checkUserAuth, loginUser } from '../action';
import { dropToken } from '../../services/token';


const initialState: UserStore = {
  authorizationStatus: Authorization.Unknown,
  email: ''
};


export const userSlicer = createSlice({
  name: StoreSliceName.UserProcess,
  initialState,
  reducers:{
    logout: (state) => {
      state.authorizationStatus = Authorization.NoAuth;
      state.email = '';
      dropToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.email = action.payload;
        state.authorizationStatus = Authorization.Auth;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.authorizationStatus = Authorization.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.authorizationStatus = Authorization.Auth;
      });
  }
});


export const {logout} = userSlicer.actions;
