import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid/non-secure'

import { REQUESTABLE } from './data'

type State = Readonly<{
  clientId: string
  baseInit: typeof REQUESTABLE
  mainInit: typeof REQUESTABLE
}>

const initialState: State = {
  clientId: nanoid(),
  baseInit: REQUESTABLE,
  mainInit: REQUESTABLE
}

const slice = createSlice({
  name: 'api',
  initialState,

  reducers: {
    baseInitPending: state => {
      state.baseInit.requestState = 'pending'
    },

    baseInitSucceeded: state => {
      state.baseInit.requestState = 'succeeded'
    },

    baseInitFailed: state => {
      state.baseInit.requestState = 'failed'
    },

    mainInitPending: state => {
      state.mainInit.requestState = 'pending'
    },

    mainInitSucceeded: state => {
      state.mainInit.requestState = 'succeeded'
    },

    mainInitFailed: state => {
      state.mainInit.requestState = 'failed'
    }
  }
})

export const apiReducer = slice.reducer
export const apiActions = slice.actions

/**
 * Selectors
 */

type RootState = Readonly<{ api: State }>

export const getInitPending = ({ api }: RootState): boolean => (
  api.baseInit.requestState === 'pending' || api.mainInit.requestState === 'pending'
)
