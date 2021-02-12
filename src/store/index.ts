import { configureStore } from '@reduxjs/toolkit'
import { useSelector as baseUseSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createLogger } from 'redux-logger'

import { apiReducer } from './api'
import { selfReducer } from './self'
import { usersReducer } from './users'
import { chatsReducer } from './chats'
import { uiReducer } from './ui'

export const store = configureStore({
  reducer: {
    api: apiReducer,
    self: selfReducer,
    users: usersReducer,
    chats: chatsReducer,
    ui: uiReducer
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), createLogger({ collapsed: true })]
})
export const getState = store.getState
export const dispatch = store.dispatch

type State = ReturnType<typeof getState>
export const useSelector: TypedUseSelectorHook<State> = baseUseSelector
