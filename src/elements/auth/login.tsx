import * as React from 'react'
import { Link } from 'react-router-dom'
import { faUser as fasUser, faLock as fasLock } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { SIGNUP_ROUTE } from 'coherent/globals'
import type { InputState } from 'coherent/globals'
import { useSelector } from 'coherent/store'
import { login } from 'coherent/logic/auth'
import { usernameInputValidator } from 'coherent/logic/input-validation'

import { FormInput } from 'coherent/components/form-input'
import { FormSubmitButton } from 'coherent/components/form-submit-button'
import { FormErrorMessage } from 'coherent/components/form-error-message'

export const Login: React.FC = () => {
  const requestState = useSelector(({ self }) => self.login.requestState)
  const errorMessage = useSelector(({ self }) => self.login.errorMessage)

  const [username, setUsername] = React.useState('')
  const [usernameState, setUsernameState] = React.useState<InputState>(null)
  const [usernameMessage, setUsernameMessage] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordState, setPasswordState] = React.useState<InputState>(null)
  const [passwordMessage, setPasswordMessage] = React.useState('')

  let errored = [usernameState, passwordState].some(state => state === 'error')

  const onSubmit: React.FormEventHandler = event => {
    event.preventDefault()
    if (errored) return

    if (username.length === 0) {
      setUsernameState('error')
      setUsernameMessage('Username required')
      errored = true
    }

    if (password.length === 0) {
      setPasswordState('error')
      setPasswordMessage('Password required')
      errored = true
    }

    if (errored) return

    login({ username, password }).catch(console.error)
  }

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputsContainer}>
          <FormInput
            value={username}
            setValue={setUsername}
            label='Username'
            icon={fasUser}
            state={usernameState === 'error' ? 'error' : null}
            setState={setUsernameState}
            message={usernameMessage}
            setMessage={setUsernameMessage}
            inputValidator={usernameInputValidator}
          />

          <FormInput
            type='password'
            value={password}
            setValue={setPassword}
            label='Password'
            icon={fasLock}
            state={passwordState === 'error' ? 'error' : null}
            setState={setPasswordState}
            message={passwordMessage}
            setMessage={setPasswordMessage}
            inputValidator={usernameInputValidator}
          />
        </div>

        <FormSubmitButton
          className={styles.submitButton}
          pending={requestState === 'pending'}
          disabled={errored}
        >
          log in
        </FormSubmitButton>
      </form>

      <FormErrorMessage errored={requestState === 'failed'}>{errorMessage}</FormErrorMessage>
      <Link className={styles.toggleLink} to={SIGNUP_ROUTE}>Not signed up?</Link>
    </>
  )
}
