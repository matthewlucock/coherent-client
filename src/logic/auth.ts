import { handlePromiseRejection } from 'coherent/util'
import { dispatch, clearStore } from 'coherent/store'
import { apiActions } from 'coherent/store/slices/api'
import { authActions } from 'coherent/store/slices/auth'
import { apiRequest, ApiError } from 'coherent/api'
import { fetchSelf } from 'coherent/logic/self'

type Auth = Readonly<{
  username: string
  password: string
}>

export const login = async (auth: Auth): Promise<void> => {
  dispatch(authActions.loginPending())

  try {
    await apiRequest('auth/login', { method: 'POST', data: auth })
    dispatch(authActions.loginSucceeded())
    handlePromiseRejection(fetchSelf())
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not log in'
    dispatch(authActions.loginFailed(errorMessage))
  }
}

export const register = async (auth: Auth): Promise<void> => {
  dispatch(authActions.registerPending())

  try {
    await apiRequest('auth/register', { method: 'POST', data: auth })
    dispatch(authActions.registerSucceeded())
    handlePromiseRejection(fetchSelf())
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not sign up'
    dispatch(authActions.registerFailed(errorMessage))
  }
}

export const logout = async (): Promise<void> => {
  dispatch(authActions.logoutPending())

  await apiRequest('auth/logout', { method: 'POST' })

  dispatch(clearStore())
  dispatch(apiActions.previousInstance())
}
