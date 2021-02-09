import type { InputState } from 'coherent/globals'

type InputValidationResult = Readonly<{
  state: InputState
  message?: string
}>
export type InputValidator = (value: string) => InputValidationResult

export const usernameInputValidator: InputValidator = username => {
  if (username.length > 30) return { state: 'error', message: 'Username is too long' }

  if (!/^(\w| )+$/.test(username)) {
    return { state: 'error', message: 'Username contains invalid characters' }
  }

  return { state: 'complete' }
}
