import { dispatch } from 'coherent/store'
import { chatActions } from 'coherent/store/slices/chats'
import { participantTyping } from 'coherent/logic/typing'

export type SocketMessage = Readonly<{
  type: string
  data?: any
}>

export const handleSocketMessage = (message: SocketMessage): void => {
  if (message.type === 'message') {
    const { chatId, ...rest } = message.data
    dispatch(chatActions.saveMessage({ chatId, message: rest }))
    return
  }

  if (message.type === 'typing') {
    const { chatId, userId } = message.data
    participantTyping({ chatId, userId })
    return
  }

  // eslint-disable-next-line no-console
  console.warn(`Unrecognised socket message type: ${message.type}`)
}
