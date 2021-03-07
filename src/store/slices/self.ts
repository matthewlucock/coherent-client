import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { REQUESTABLE } from '../data'
import type { Self } from '../data'

type State = Readonly<{
  data: Self
  fetch: typeof REQUESTABLE
}>
const initialState: State = {
  data: {
    id: '',
    displayName: ''
  },
  fetch: REQUESTABLE
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
    }
  }
})

export const selfReducer = slice.reducer
export const selfActions = slice.actions
