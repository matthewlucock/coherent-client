import { handlePromiseRejection } from 'coherent/util'
import { getState, dispatch } from 'coherent/store'
import { chatActions } from 'coherent/store/slices/chats'
import { uiActions } from 'coherent/store/slices/ui'
import { apiRequest } from 'coherent/api'

export const fetchChat = async (chatId: string): Promise<void> => {
  const state = getState()
  const chat = state.chats[chatId]

  const params = new URLSearchParams()
  if (chat.messages.length > 0) {
    const oldestMessage = chat.messages[chat.messages.length - 1]
    params.set('beforeTime', oldestMessage.time.toString())
  }

  const messages = await apiRequest(`chat/${chatId}`, { params })
  dispatch(chatActions.initialFetchSucceeded({ chatId, messages }))
}

export const selectChat = (chatId: string): void => {
  const state = getState()
  const chat = state.chats[chatId]

  dispatch(uiActions.selectChat(chatId))

  if (chat.initialFetch.requestState === null || chat.initialFetch.requestState === 'failed') {
    handlePromiseRejection(fetchChat(chatId))
  }
}

type QueueMessageArgs = Readonly<{
  chatId: string
  content: string
}>
export const queueMessage = ({ chatId, content }: QueueMessageArgs): void => {
  const state = getState()
  const chat = state.chats[chatId]

  dispatch(chatActions.queueMessage({ chatId, content }))
  if (!chat.sending) handlePromiseRejection(sendMessages(chatId))
}

export const sendMessages = async (chatId: string): Promise<void> => {
  const state = getState()
  const chat = state.chats[chatId]
  const selfId = state.self.data!.id

  if (chat.queue.length === 0) throw new Error('No messages to send')
  const queuedMessage = chat.queue[chat.queue.length - 1]

  dispatch(chatActions.sendPending(chatId))

  const message = await apiRequest(`chat/${chatId}`, {
    method: 'POST',
    data: { content: queuedMessage.content }
  })

  message.userId = selfId
  message.timeSent = queuedMessage.time
  dispatch(chatActions.sendSucceeded({ chatId, message }))

  const newState = getState()
  const newChat = newState.chats[chatId]

  if (newChat.queue.length > 0) {
    handlePromiseRejection(sendMessages(chatId))
  }
}
