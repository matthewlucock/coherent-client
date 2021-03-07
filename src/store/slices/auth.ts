import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { REQUESTABLE } from '../data'

type State = Readonly<{
  login: typeof REQUESTABLE
  register: typeof REQUESTABLE
  logout: typeof REQUESTABLE
}>
const initialState: State = {
  login: REQUESTABLE,
  register: REQUESTABLE,
  logout: REQUESTABLE
}

const slice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginPending: state => {
      state.login.requestState = 'pending'
    },

    loginSucceeded: state => {
      state.login.requestState = 'succeeded'
    },

    loginFailed: (state, { payload }: PayloadAction<string>) => {
      state.login.requestState = 'failed'
      state.login.errorMessage = payload
    },

    registerPending: state => {
      state.register.requestState = 'pending'
    },

    registerSucceeded: state => {
      state.register.requestState = 'succeeded'
    },

    registerFailed: (state, { payload }: PayloadAction<string>) => {
      state.register.errorMessage = payload
      state.register.requestState = 'failed'
    },

    logoutPending: state => {
      state.logout.requestState = 'pending'
    }
  }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
