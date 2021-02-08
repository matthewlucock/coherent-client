import { apiRequest } from '.'
import { store } from 'coherent/store'
import { usersActions } from 'coherent/store/users'

// todo: not fetch already being fetched
export const fetchUser = async (userId: string): Promise<void> => {
  const state = store.getState()

  if (state.users[userId] !== undefined) return

  try {
    const user = await apiRequest(`user/${userId}`)
    store.dispatch(usersActions.saveUser(user))
  } catch (error) {
    // 🤷‍♀️
  }
}
