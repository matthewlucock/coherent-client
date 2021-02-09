import * as React from 'react'
import { Link } from 'react-router-dom'
import { faUserCircle as fasUserCircle, faLock as fasLock } from '@fortawesome/free-solid-svg-icons'

import type { InputState } from 'coherent/globals'
import { useSelector } from 'coherent/store'
import { signup } from 'coherent/logic/auth'
import { usernameInputValidator } from 'coherent/logic/input-validation'
import { LOGIN_ROUTE } from 'coherent/routes'

import { FormInput } from 'coherent/components/form-input'
import { FormSubmitButton } from 'coherent/components/form-submit-button'
import { FormErrorMessage } from 'coherent/components/form-error-message'

import styles from './styles.scss'

export const Signup: React.FC = () => {
  const requestState = useSelector(({ self }) => self.signup.requestState)
  const errorMessage = useSelector(({ self }) => self.signup.errorMessage)

  const [username, setUsername] = React.useState('')
  const [usernameState, setUsernameState] = React.useState<InputState>(null)
  const [usernameMessage, setUsernameMessage] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordState, setPasswordState] = React.useState<InputState>(null)
  const [passwordMessage, setPasswordMessage] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [confirmPasswordState, setConfirmPasswordState] = React.useState<InputState>(null)
  const [confirmPasswordMessage, setConfirmPasswordMessage] = React.useState('')

  React.useEffect(() => {
    if (confirmPassword.length === 0) return
    if (password === confirmPassword) {
      setConfirmPasswordState('complete')
    } else {
      setConfirmPasswordState(null)
    }
  }, [password, confirmPassword])

  let errored = [usernameState, passwordState, confirmPasswordState].some(
    state => state === 'error'
  )

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

    if (confirmPassword.length === 0) {
      setConfirmPasswordState('error')
      setConfirmPasswordMessage('Password confirmation required')
      errored = true
    } else if (confirmPassword !== password) {
      setConfirmPasswordState('error')
      setConfirmPasswordMessage('Passwords don\'t match')
      errored = true
    }

    if (errored) return

    signup({ username, password }).catch(console.error)
  }

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputsContainer}>
          <FormInput
            value={username}
            setValue={setUsername}
            label='Username'
            icon={fasUserCircle}
            state={usernameState}
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
            state={passwordState}
            setState={setPasswordState}
            message={passwordMessage}
            setMessage={setPasswordMessage}
            inputValidator={usernameInputValidator}
          />

          <FormInput
            type='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
            label='Confirm password'
            icon={fasLock}
            state={confirmPasswordState}
            setState={setConfirmPasswordState}
            message={confirmPasswordMessage}
            setMessage={setConfirmPasswordMessage}
          />
        </div>

        <FormSubmitButton
          className={styles.submitButton}
          pending={requestState === 'pending'}
          disabled={errored}
        >
          sign up
        </FormSubmitButton>
      </form>

      <FormErrorMessage errored={requestState === 'failed'}>{errorMessage}</FormErrorMessage>
      <Link className={styles.toggleLink} to={LOGIN_ROUTE}>Already signed up?</Link>
    </>
  )
}
