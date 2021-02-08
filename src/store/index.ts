import { configureStore } from '@reduxjs/toolkit'
import { useSelector as baseUseSelector, useDispatch as baseUseDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createLogger } from 'redux-logger'

import { apiReducer } from './api'
import { selfReducer } from './self'
import { usersReducer } from './users'
import { chatsReducer } from './chats'

export const store = configureStore({
  reducer: {
    api: apiReducer,
    self: selfReducer,
    users: usersReducer,
    chats: chatsReducer
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), createLogger({ collapsed: true })]
})

type State = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<State> = baseUseSelector
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useDispatch = () => baseUseDispatch<typeof store.dispatch>()
