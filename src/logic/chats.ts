import { store } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'
import { apiRequest } from 'coherent/api'

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
  const chat = store.getState().chats.chats[chatId]
  if (chat.queue.length === 0) throw new Error('No messages to send')
  const queuedMessage = chat.queue[chat.queue.length - 1]

  store.dispatch(chatsActions.sendPending(chatId))

  const message = await apiRequest(`chat/${chatId}`, {
    method: 'POST',
    data: { content: queuedMessage.content }
  })

  message.timeSent = queuedMessage.time
  store.dispatch(chatsActions.sendSucceeded(chatId))
  store.dispatch(chatsActions.saveMessage(message))

  if (store.getState().chats.chats[chatId].queue.length > 0) {
    sendMessages(chatId).catch(console.error)
  }
}
