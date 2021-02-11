import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid/non-secure'

import { REQUESTABLE } from './data'

export type BaseMessage = Readonly<{
  id: string
  time: number
  content: string
}>
export type OfficialMessage = BaseMessage & Readonly<{
  userId: string
  timeSent?: number
}>
export const isMessageOfficial = (message: BaseMessage): message is OfficialMessage => (
  (message as OfficialMessage).userId !== undefined
)

type ChatData = Readonly<{
  participantIds: string[]
}>
type ChatDataWithId = ChatData & Readonly<{ id: string }>
type Chat = ChatData & Readonly<{
  initialFetch: typeof REQUESTABLE
  messages: OfficialMessage[]
  sending: boolean
  queue: BaseMessage[]
  failedToSend: BaseMessage[]
}>

type State = Readonly<{
  chats: { [id: string]: Chat }
  selected: string | null
}>
const initialState: State = {
  chats: {},
  selected: null
}

type SaveMessageOptions = Readonly<{
  chatId: string
  message: OfficialMessage
}>
const saveMessage = (state: State, { chatId, message }: SaveMessageOptions): void => {
  const messageList = state.chats[chatId].messages

  for (const [index, givenMessage] of messageList.entries()) {
    if (message.time > givenMessage.time) {
      messageList.splice(index, 0, message)
      return
    }
  }

  messageList.push(message)
}

type QueueMessagePayload = Readonly<{
  chatId: string
  content: string
}>
type InitialFetchSucceededPayload = Readonly<{
  chatId: string
  messages: readonly OfficialMessage[]
}>

const slice = createSlice({
  name: 'chats',
  initialState,

  reducers: {
    saveChat: (state, { payload }: PayloadAction<ChatDataWithId>) => {
      const { id, ...chat } = payload

      state.chats[id] = {
        ...chat,
        initialFetch: REQUESTABLE,
        messages: [],
        sending: false,
        queue: [],
        failedToSend: []
      }
    },

    select: (state, { payload }: PayloadAction<string>) => {
      state.selected = payload
    },

    initialFetchPending: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state.chats[chatId]
      chat.initialFetch.requestState = 'pending'
    },

    initialFetchSucceeded: (state, { payload }: PayloadAction<InitialFetchSucceededPayload>) => {
      const { chatId, messages } = payload
      const chat = state.chats[chatId]
      chat.initialFetch.requestState = 'succeeded'

      for (const message of messages) saveMessage(state, { chatId, message })
    },

    initialFetchFailed: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state.chats[chatId]
      chat.initialFetch.requestState = 'failed'
    },

    queueMessage: (state, { payload }: PayloadAction<QueueMessagePayload>) => {
      const { chatId, content } = payload
      const chat = state.chats[chatId]

      chat.queue.unshift({
        id: nanoid(2),
        content,
        time: Date.now()
      })
    },

    sendPending: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state.chats[chatId]
      chat.sending = true
    },

    sendSucceeded: (state, { payload }: PayloadAction<SaveMessageOptions>) => {
      const { chatId, message } = payload

      const chat = state.chats[chatId]
      chat.queue.pop()
      chat.sending = false

      saveMessage(state, { chatId, message })
    },

    saveMessage: (state, { payload }: PayloadAction<SaveMessageOptions>) => {
      saveMessage(state, payload)
    }
  }
})

export const chatsReducer = slice.reducer
export const chatsActions = slice.actions
