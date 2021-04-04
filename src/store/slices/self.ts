import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { REQUESTABLE } from '../data'
import type { Self } from '../data'

type State = Readonly<{
  data: Self
  fetch: typeof REQUESTABLE
  onboardingDisplayName: typeof REQUESTABLE
}>
const initialState: State = {
  data: {
    id: '',
    displayName: ''
  },
  fetch: REQUESTABLE,
  onboardingDisplayName: REQUESTABLE
}

const slice = createSlice({
  name: 'self',
  initialState,

  reducers: {
    fetchPending: state => {
      state.fetch.requestState = 'pending'
    },

    fetchSucceeded: (state, { payload: self }: PayloadAction<Self | null>) => {
      state.fetch.requestState = 'succeeded'
      if (self !== null) state.data = self
    },

    fetchFailed: (state, { payload }: PayloadAction<string>) => {
      state.fetch.requestState = 'failed'
      state.fetch.errorMessage = payload
    },

    onboardingDisplayNamePending: state => {
      state.onboardingDisplayName.requestState = 'pending'
    },

    onboardingDisplayNameSucceeded: (state, { payload }: PayloadAction<string>) => {
      state.onboardingDisplayName.requestState = 'succeeded'
      state.data.displayName = payload
    },

    onboardingDisplayNameFailed: (state, { payload }: PayloadAction<string>) => {
      state.onboardingDisplayName.requestState = 'failed'
      state.onboardingDisplayName.errorMessage = payload
    }
  }
})

export const selfReducer = slice.reducer
export const selfActions = slice.actions
