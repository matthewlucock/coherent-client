import { store } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'
import { apiRequest } from 'coherent/api'

export const fetchChat = async (chatId: string): Promise<void> => {
  const chat = store.getState().chats.chats[chatId]

  const params = new URLSearchParams()
  if (chat.messages.length > 0) {
    const oldestMessage = chat.messages[chat.messages.length - 1]
    params.set('beforeTime', oldestMessage.time.toString())
  }

  const messages = await apiRequest(`chat/${chatId}`, { params })
  store.dispatch(chatsActions.initialFetchSucceeded({ chatId, messages }))
}

export const selectChat = (chatId: string): void => {
  store.dispatch(chatsActions.select(chatId))

  const chat = store.getState().chats.chats[chatId]
  if (chat.initialFetch.requestState === null || chat.initialFetch.requestState === 'failed') {
    fetchChat(chatId).catch(console.error)
  }
}

type QueueMessageArgs = Readonly<{
  chatId: string
  content: string
}>
export const queueMessage = ({ chatId, content }: QueueMessageArgs): void => {
  const chat = store.getState().chats.chats[chatId]

  store.dispatch(chatsActions.queueMessage({ chatId, content }))
  if (!chat.sending) sendMessages(chatId).catch(console.error)
}

export const sendMessages = async (chatId: string): Promise<void> => {
  const state = store.getState()
  const selfId = state.self.data!.id

  const chat = state.chats.chats[chatId]
  if (chat.queue.length === 0) throw new Error('No messages to send')
  const queuedMessage = chat.queue[chat.queue.length - 1]

  store.dispatch(chatsActions.sendPending(chatId))

  const message = await apiRequest(`chat/${chatId}`, {
    method: 'POST',
    data: { content: queuedMessage.content }
  })

  message.userId = selfId
  message.timeSent = queuedMessage.time
  store.dispatch(chatsActions.sendSucceeded({ chatId, message }))

  if (store.getState().chats.chats[chatId].queue.length > 0) {
    sendMessages(chatId).catch(console.error)
  }
}
