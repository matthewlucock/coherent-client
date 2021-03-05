import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { REQUESTABLE } from '../data'
import type { BaseUser } from '../data'

export type Self = BaseUser

type State = Readonly<{
  data: Self | null
  fetch: typeof REQUESTABLE
  login: typeof REQUESTABLE
  signup: typeof REQUESTABLE
  logout: typeof REQUESTABLE
}>

const initialState: State = {
  data: null,
  fetch: REQUESTABLE,
  login: REQUESTABLE,
  signup: REQUESTABLE,
  logout: REQUESTABLE
}

const slice = createSlice({
  name: 'self',
  initialState,

  reducers: {
    fetchPending: state => {
      state.fetch.requestState = 'pending'
    },

    fetchSucceeded: (state, { payload }: PayloadAction<Self>) => {
      state.fetch.requestState = 'succeeded'
      state.data = payload
    },

    fetchFailed: (state, { payload }: PayloadAction<string>) => {
      state.fetch.requestState = 'failed'
      state.fetch.errorMessage = payload
    },

    loginPending: state => {
      state.login.requestState = 'pending'
    },

    loginSucceeded: (state, { payload }: PayloadAction<Self>) => {
      state.login.requestState = 'succeeded'
      state.data = payload
    },

    loginFailed: (state, { payload }: PayloadAction<string>) => {
      state.login.requestState = 'failed'
      state.login.errorMessage = payload
    },

    signupPending: state => {
      state.signup.requestState = 'pending'
    },

    signupSucceeded: (state, { payload }: PayloadAction<Self>) => {
      state.signup.requestState = 'succeeded'
      state.data = payload
    },

    signupFailed: (state, { payload }: PayloadAction<string>) => {
      state.signup.requestState = 'failed'
      state.signup.errorMessage = payload
    },

    logoutPending: state => {
      state.logout.requestState = 'pending'
    }
  }
})

export const selfReducer = slice.reducer
export const selfActions = slice.actions

/**
 * Selectors
 */

type RootState = Readonly<{ self: State }>

export const getAuthenticated = ({ self }: RootState): boolean => self.data !== null
