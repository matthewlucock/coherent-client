import { store } from 'coherent/store'
import { apiActions } from 'coherent/store/api'
import { usersActions } from 'coherent/store/users'
import { chatsActions } from 'coherent/store/chats'
import { apiRequest } from 'coherent/api'
import { socket } from 'coherent/api/socket'
import { fetchSelf } from './self'

export const baseInit = async (): Promise<void> => {
  store.dispatch(apiActions.baseInitPending())

  try {
    await fetchSelf()
  } catch (error) {
    store.dispatch(apiActions.baseInitFailed())
    return
  }

  store.dispatch(apiActions.baseInitSucceeded())
}

export const mainInit = async (): Promise<void> => {
  store.dispatch(apiActions.mainInitPending())

  try {
    await socket.connect()
    const { chats, messages, users } = await apiRequest('init')

    for (const chat of chats) store.dispatch(chatsActions.saveChat(chat))
    for (const message of messages) store.dispatch(chatsActions.saveMessage(message))
    for (const user of users) store.dispatch(usersActions.saveUser(user))
  } catch (error) {
    store.dispatch(apiActions.mainInitFailed())
    return
  }

  store.dispatch(apiActions.mainInitSucceeded())
}
