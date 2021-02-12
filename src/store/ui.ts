import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = Readonly<{
  userMenuVisible: boolean
}>

const initialState: State = {
  userMenuVisible: false
}

const slice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    setUserMenuVisible: (state, { payload: userMenuShowing }: PayloadAction<boolean>) => {
      state.userMenuVisible = userMenuShowing
    }
  }
})

export const uiReducer = slice.reducer
export const uiActions = slice.actions
