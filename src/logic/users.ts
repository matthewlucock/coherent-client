import { getState, dispatch } from 'coherent/store'
import { usersActions } from 'coherent/store/slices/users'
import { apiRequest } from 'coherent/api'

// todo: not fetch already being fetched
export const fetchUser = async (userId: string): Promise<void> => {
  const state = getState()

  if (state.users[userId] !== undefined) return

  try {
    const user = await apiRequest(`user/${userId}`)
    dispatch(usersActions.saveUser(user))
  } catch (error) {
    // 🤷‍♀️
  }
}
