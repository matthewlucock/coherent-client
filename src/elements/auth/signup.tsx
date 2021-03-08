import * as React from 'react'
import { Link } from 'react-router-dom'
import { faUserCircle as fasUserCircle, faLock as fasLock } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { LOGIN_ROUTE } from 'coherent/globals'
import type { InputState } from 'coherent/globals'
import { handlePromiseRejection } from 'coherent/util'
import { useSelector } from 'coherent/store'
import { register } from 'coherent/logic/auth'
import { usernameInputValidator } from 'coherent/logic/input-validation'

import { Form } from 'coherent/components/form'
import { FormInput } from 'coherent/components/form-input'

export const Signup: React.FC = () => {
  const requestState = useSelector(({ auth }) => auth.register.requestState)
  const errorMessage = useSelector(({ auth }) => auth.register.errorMessage)

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

  const onSubmit = (): void => {
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
    handlePromiseRejection(register({ username, password }))
  }

  return (
    <>
      <Form
        buttonLabel='Sign Up'
        onSubmit={onSubmit}
        pending={requestState === 'pending'}
        errored={errored}
        errorMessage={errorMessage}
      >
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
      </Form>

      <Link className={styles.toggleLink} to={LOGIN_ROUTE}>Already signed up?</Link>
    </>
  )
}
