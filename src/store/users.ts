import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { BaseUser } from './data'

export type User = BaseUser

type State = { [id: string]: User }

const initialState: State = {}

const slice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    saveUser: (state, { payload }: PayloadAction<User>) => {
      state[payload.id] = payload
    }
  }
})

export const usersReducer = slice.reducer
export const usersActions = slice.actions
