import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid/non-secure'

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
type OfficialMessageFromServer = OfficialMessage & Readonly<{ chatId: string }>

type ChatData = Readonly<{
  participantIds: string[]
}>
type ChatDataWithId = ChatData & Readonly<{ id: string }>
type Chat = ChatData & Readonly<{
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

type QueueMessagePayload = Readonly<{
  chatId: string
  content: string
}>

const slice = createSlice({
  name: 'chats',
  initialState,

  reducers: {
    saveChat: (state, { payload }: PayloadAction<ChatDataWithId>) => {
      const { id, ...chat } = payload

      state.chats[id] = {
        ...chat,
        messages: [],
        sending: false,
        queue: [],
        failedToSend: []
      }
    },

    select: (state, { payload }: PayloadAction<string>) => {
      state.selected = payload
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

    sendSucceeded: (state, { payload: chatId }: PayloadAction<string>) => {
      const chat = state.chats[chatId]
      chat.queue.pop()
      chat.sending = false
    },

    saveMessage: (state, { payload }: PayloadAction<OfficialMessageFromServer>) => {
      const { chatId, ...message } = payload
      const messageList = state.chats[chatId].messages

      for (const [index, givenMessage] of messageList.entries()) {
        if (message.time > givenMessage.time) {
          messageList.splice(index, 0, message)
          return
        }
      }

      messageList.push(message)
    }
  }
})

export const chatsReducer = slice.reducer
export const chatsActions = slice.actions
