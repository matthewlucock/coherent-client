import { apiRequest, ApiError } from '.'
import { store } from 'coherent/store'
import { selfActions } from 'coherent/store/self'

type Auth = Readonly<{
  username: string
  password: string
}>

export const login = async (auth: Auth): Promise<void> => {
  store.dispatch(selfActions.loginPending())

  try {
    const user = await apiRequest('auth/login', { method: 'POST', data: auth })
    store.dispatch(selfActions.loginSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not log in'
    store.dispatch(selfActions.loginFailed(errorMessage))
  }
}

export const signup = async (auth: Auth): Promise<void> => {
  store.dispatch(selfActions.signupPending())

  try {
    const user = await apiRequest('auth/signup', { method: 'POST', data: auth })
    store.dispatch(selfActions.signupSucceeded(user))
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Could not sign up'
    store.dispatch(selfActions.signupFailed(errorMessage))
  }
}
