import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = Readonly<{
  darkTheme: boolean
  userMenuVisible: boolean
  selectedChat: string | null
}>
const initialState: State = {
  darkTheme: false,
  userMenuVisible: false,
  selectedChat: null
}

const slice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    setDarkTheme: (state, { payload: darkTheme }: PayloadAction<boolean>) => {
      state.darkTheme = darkTheme
    },

    setUserMenuVisible: (state, { payload: userMenuShowing }: PayloadAction<boolean>) => {
      state.userMenuVisible = userMenuShowing
    },

    selectChat: (state, { payload: chatId }: PayloadAction<string>) => {
      state.selectedChat = chatId
    }
  }
})

export const uiReducer = slice.reducer
export const uiActions = slice.actions
