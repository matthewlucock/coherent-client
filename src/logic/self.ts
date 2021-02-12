import { dispatch } from 'coherent/store'
import { selfActions } from 'coherent/store/self'
import { apiRequest, ApiError } from 'coherent/api'

export const fetchSelf = async (): Promise<void> => {
  dispatch(selfActions.fetchPending())

  try {
    const user = await apiRequest('self')
    dispatch(selfActions.fetchSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not fetch user'
    dispatch(selfActions.fetchFailed(errorMessage))
  }
}
