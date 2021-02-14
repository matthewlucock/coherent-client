import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = Readonly<{
  userMenuVisible: boolean
  selectedChat: string | null
}>
const initialState: State = {
  userMenuVisible: false,
  selectedChat: null
}

const slice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
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
