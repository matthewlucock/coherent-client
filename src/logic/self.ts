import { dispatch } from 'coherent/store'
import { selfActions } from 'coherent/store/slices/self'
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

export const onboardingDisplayName = async (displayName: string): Promise<void> => {
  dispatch(selfActions.onboardingDisplayNamePending())

  try {
    await apiRequest('self/display-name', { method: 'POST', data: { displayName } })
    dispatch(selfActions.onboardingDisplayNameSucceeded(displayName))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not set display name'
    dispatch(selfActions.onboardingDisplayNameFailed(errorMessage))
  }
}
