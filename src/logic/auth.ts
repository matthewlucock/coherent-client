import { dispatch, clearStore } from 'coherent/store'
import { apiActions } from 'coherent/store/api'
import { selfActions } from 'coherent/store/self'
import { apiRequest, ApiError } from 'coherent/api'

type Auth = Readonly<{
  username: string
  password: string
}>

export const login = async (auth: Auth): Promise<void> => {
  dispatch(selfActions.loginPending())

  try {
    const user = await apiRequest('auth/login', { method: 'POST', data: auth })
    dispatch(selfActions.loginSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not log in'
    dispatch(selfActions.loginFailed(errorMessage))
  }
}

export const signup = async (auth: Auth): Promise<void> => {
  dispatch(selfActions.signupPending())

  try {
    const user = await apiRequest('auth/signup', { method: 'POST', data: auth })
    dispatch(selfActions.signupSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not sign up'
    dispatch(selfActions.signupFailed(errorMessage))
  }
}

export const logout = async (): Promise<void> => {
  dispatch(selfActions.logoutPending())

  await apiRequest('auth/logout', { method: 'POST' })

  dispatch(clearStore())
  dispatch(apiActions.baseInitSucceeded())
}
