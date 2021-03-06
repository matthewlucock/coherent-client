import { dispatch } from 'coherent/store'
import { apiActions } from 'coherent/store/slices/api'
import { usersActions } from 'coherent/store/slices/users'
import { chatActions } from 'coherent/store/slices/chats'
import { apiRequest } from 'coherent/api'
import { socket } from 'coherent/api/socket'

export const init = async (): Promise<void> => {
  dispatch(apiActions.initPending())

  try {
    await socket.connect()

    const { chats, messages, users } = await apiRequest('initial-data')

    for (const chat of chats) dispatch(chatActions.saveChat(chat))

    for (const message of messages) {
      const { chatId, ...rest } = message
      dispatch(chatActions.saveMessage({ chatId, message: rest }))
    }

    for (const user of users) dispatch(usersActions.saveUser(user))
  } catch (error) {
    dispatch(apiActions.initFailed())
    return
  }

  dispatch(apiActions.initSucceeded())
}
