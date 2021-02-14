import { dispatch } from 'coherent/store'
import { apiActions } from 'coherent/store/api'
import { usersActions } from 'coherent/store/users'
import { chatActions } from 'coherent/store/chats'
import { apiRequest } from 'coherent/api'
import { socket } from 'coherent/api/socket'

import { fetchSelf } from './self'

export const baseInit = async (): Promise<void> => {
  dispatch(apiActions.baseInitPending())

  try {
    await fetchSelf()
  } catch (error) {
    dispatch(apiActions.baseInitFailed())
    return
  }

  dispatch(apiActions.baseInitSucceeded())
}

export const mainInit = async (): Promise<void> => {
  dispatch(apiActions.mainInitPending())

  try {
    await socket.connect()
    const { chats, messages, users } = await apiRequest('init')

    for (const chat of chats) dispatch(chatActions.saveChat(chat))
    for (const message of messages) {
      const { chatId, ...rest } = message
      dispatch(chatActions.saveMessage({ chatId, message: rest }))
    }
    for (const user of users) dispatch(usersActions.saveUser(user))
  } catch (error) {
    dispatch(apiActions.mainInitFailed())
    return
  }

  dispatch(apiActions.mainInitSucceeded())
}
