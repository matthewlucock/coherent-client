import { getState, dispatch } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'
import { apiRequest } from 'coherent/api'

export const fetchChat = async (chatId: string): Promise<void> => {
  const chat = getState().chats.chats[chatId]

  const params = new URLSearchParams()
  if (chat.messages.length > 0) {
    const oldestMessage = chat.messages[chat.messages.length - 1]
    params.set('beforeTime', oldestMessage.time.toString())
  }

  const messages = await apiRequest(`chat/${chatId}`, { params })
  dispatch(chatsActions.initialFetchSucceeded({ chatId, messages }))
}

export const selectChat = (chatId: string): void => {
  dispatch(chatsActions.select(chatId))

  const chat = getState().chats.chats[chatId]
  if (chat.initialFetch.requestState === null || chat.initialFetch.requestState === 'failed') {
    fetchChat(chatId).catch(console.error)
  }
}

type QueueMessageArgs = Readonly<{
  chatId: string
  content: string
}>
export const queueMessage = ({ chatId, content }: QueueMessageArgs): void => {
  const chat = getState().chats.chats[chatId]

  dispatch(chatsActions.queueMessage({ chatId, content }))
  if (!chat.sending) sendMessages(chatId).catch(console.error)
}

export const sendMessages = async (chatId: string): Promise<void> => {
  const state = getState()
  const selfId = state.self.data!.id

  const chat = state.chats.chats[chatId]
  if (chat.queue.length === 0) throw new Error('No messages to send')
  const queuedMessage = chat.queue[chat.queue.length - 1]

  dispatch(chatsActions.sendPending(chatId))

  const message = await apiRequest(`chat/${chatId}`, {
    method: 'POST',
    data: { content: queuedMessage.content }
  })

  message.userId = selfId
  message.timeSent = queuedMessage.time
  dispatch(chatsActions.sendSucceeded({ chatId, message }))

  if (getState().chats.chats[chatId].queue.length > 0) {
    sendMessages(chatId).catch(console.error)
  }
}
