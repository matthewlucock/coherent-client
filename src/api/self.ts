import { apiRequest, ApiError } from '.'
import { store } from 'coherent/store'
import { selfActions } from 'coherent/store/self'

export const fetchSelf = async (): Promise<void> => {
  store.dispatch(selfActions.fetchPending())

  try {
    const user = await apiRequest('self')
    store.dispatch(selfActions.fetchSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not fetch user'
    store.dispatch(selfActions.fetchFailed(errorMessage))
  }
}
