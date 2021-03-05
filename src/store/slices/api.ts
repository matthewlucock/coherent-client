import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid/non-secure'

import { REQUESTABLE } from '../data'

type State = Readonly<{
  clientId: string
  previousInstance: boolean
  noConnection: boolean
  init: typeof REQUESTABLE
}>

const initialState: State = {
  clientId: nanoid(),
  previousInstance: false,
  noConnection: false,
  init: REQUESTABLE
}

const slice = createSlice({
  name: 'api',
  initialState,

  reducers: {
    previousInstance: state => {
      state.previousInstance = true
    },

    setNoConnection: (state, { payload: noConnection }: PayloadAction<boolean>) => {
      state.noConnection = noConnection
    },

    initPending: state => {
      state.init.requestState = 'pending'
    },

    initSucceeded: state => {
      state.init.requestState = 'succeeded'
    },

    initFailed: state => {
      state.init.requestState = 'failed'
    }
  }
})

export const apiReducer = slice.reducer
export const apiActions = slice.actions
