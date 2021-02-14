import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid/non-secure'

import { simpleRemoveFromArray } from 'coherent/util'
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

type ChatDataFromServer = Readonly<{
  participantIds: string[]
}>
type DynamicChatData = Readonly<{
  initialFetch: typeof REQUESTABLE
  messages: OfficialMessage[]
  sending: boolean
  queue: BaseMessage[]
  failedToSend: BaseMessage[]
  typing: {
    lastSelfTypingTime: number
    participants: string[]
  }
}>
type Chat = ChatDataFromServer & DynamicChatData

type State = { [id: string]: Chat }
const initialState: State = {}
const initialDynamicChatData: DynamicChatData = {
  initialFetch: REQUESTABLE,
  messages: [],
  sending: false,
  queue: [],
  failedToSend: [],
  typing: {
    lastSelfTypingTime: 0,
    participants: []
  }
}

type SaveMessageOptions = Readonly<{
  chatId: string
  message: OfficialMessage
}>
const saveMessage = (state: State, { chatId, message }: SaveMessageOptions): void => {
  const messageList = state[chatId].messages

  for (const [index, givenMessage] of messageList.entries()) {
    if (message.time > givenMessage.time) {
      messageList.splice(index, 0, message)
      return
    }
  }

  messageList.push(message)
}

type SaveChatPayload = ChatDataFromServer & Readonly<{ id: string }>
type QueueMessagePayload = Readonly<{
  chatId: string
  content: string
}>
type InitialFetchSucceededPayload = Readonly<{
  chatId: string
  messages: readonly OfficialMessage[]
}>
type SetSelfTypingTimePayload = Readonly<{
  chatId: string
  time: number
}>
type SetParticipantTypingPayload = Readonly<{
  chatId: string
  userId: string
}>

const slice = createSlice({
  name: 'chats',
  initialState,

  reducers: {
    saveChat: (state, { payload }: PayloadAction<SaveChatPayload>) => {
      const { id, ...chatData } = payload
      state[id] = { ...chatData, ...initialDynamicChatData }
    },

    initialFetchPending: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state[chatId]
      chat.initialFetch.requestState = 'pending'
    },
    initialFetchSucceeded: (state, { payload }: PayloadAction<InitialFetchSucceededPayload>) => {
      const { chatId, messages } = payload
      const chat = state[chatId]

      chat.initialFetch.requestState = 'succeeded'
      for (const message of messages) saveMessage(state, { chatId, message })
    },
    initialFetchFailed: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state[chatId]
      chat.initialFetch.requestState = 'failed'
    },

    saveMessage: (state, { payload }: PayloadAction<SaveMessageOptions>) => {
      saveMessage(state, payload)
    },

    queueMessage: (state, { payload }: PayloadAction<QueueMessagePayload>) => {
      const { chatId, content } = payload
      const chat = state[chatId]

      chat.queue.unshift({
        id: nanoid(2),
        content,
        time: Date.now()
      })
    },
    sendPending: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state[chatId]
      chat.sending = true
    },
    sendSucceeded: (state, { payload }: PayloadAction<SaveMessageOptions>) => {
      const { chatId, message } = payload
      const chat = state[chatId]

      chat.queue.pop()
      chat.sending = false

      saveMessage(state, { chatId, message })
    },

    setSelfTypingTime: (state, { payload }: PayloadAction<SetSelfTypingTimePayload>) => {
      const { chatId, time } = payload
      const chat = state[chatId]

      chat.typing.lastSelfTypingTime = time
    },
    setParticipantTyping: (state, { payload }: PayloadAction<SetParticipantTypingPayload>) => {
      const { chatId, userId } = payload
      const chat = state[chatId]

      chat.typing.participants.unshift(userId)
    },
    setParticipantStoppedTyping: (
      state,
      { payload }: PayloadAction<SetParticipantTypingPayload>
    ) => {
      const { chatId, userId } = payload
      const chat = state[chatId]

      simpleRemoveFromArray(chat.typing.participants, userId)
    }
  }
})

export const chatsReducer = slice.reducer
export const chatActions = slice.actions
